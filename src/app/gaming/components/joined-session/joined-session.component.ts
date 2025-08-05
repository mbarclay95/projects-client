import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createGamingSession, GamingSession } from '../../models/gaming-session.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCircle,
  faEllipsisV,
  faGear,
  faGripVertical,
  faPause,
  faPlay,
  faShuffle,
  faStop,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import { createGamingSessionDevice, GamingSessionDevice } from '../../models/gaming-session-device.model';
import { CdkDragHandle, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropdownButtonDirective, NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { Subject } from 'rxjs';
import { CreateEditSessionModalComponent } from '../create-edit-session-modal/create-edit-session-modal.component';
import { GamingSessionsFacadeService } from '../../services/gaming-sessions-facade.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PermissionsService } from '../../../auth/services/permissions.service';
import { Permissions } from '../../../auth/permissions';

@Component({
  selector: 'app-joined-session',
  imports: [
    FaIconComponent,
    CdkDropList,
    CdkDragHandle,
    NzButtonComponent,
    DragDropModule,
    NzDropDownDirective,
    NzDropdownButtonDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    CreateEditSessionModalComponent,
  ],
  templateUrl: './joined-session.component.html',
  styleUrl: './joined-session.component.scss',
})
export class JoinedSessionComponent {
  @Input() activeSession!: GamingSession;
  @Input() userSessionDeviceId!: number;
  @Output() editSessionDevice: EventEmitter<GamingSessionDevice> = new EventEmitter<GamingSessionDevice>();

  updating = false;
  button = faCircle;
  settings = faGear;
  more = faEllipsisV;
  grip = faGripVertical;
  pause = faPause;
  play = faPlay;
  finish = faStop;
  random = faShuffle;
  leave = faUserSlash;
  openSessionModal: Subject<GamingSession> = new Subject<GamingSession>();
  adminPermission = Permissions.GAMING_SESSIONS_ADMIN_PAGE;

  constructor(
    public gamingSessionsFacadeService: GamingSessionsFacadeService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private nzModalService: NzModalService,
    public permissionsService: PermissionsService,
  ) {}

  editClicked(sessionDevice: GamingSessionDevice): void {
    this.editSessionDevice.emit(createGamingSessionDevice(sessionDevice));
  }

  dropSessionDevice({ event }: { event: any }): void {
    const oldPosition = event.previousIndex + 1;
    const newPosition = event.currentIndex + 1;
    if (oldPosition === newPosition) {
      return;
    }

    const movedSessionDevices: { id: number; turnOrder: number }[] = [];
    const movedDown: boolean = oldPosition - newPosition > 0;

    this.activeSession.gamingSessionDevices
      .filter((sessionDevice) => {
        if (movedDown) {
          return sessionDevice.currentTurnOrder <= oldPosition && sessionDevice.currentTurnOrder >= newPosition;
        } else {
          return sessionDevice.currentTurnOrder >= oldPosition && sessionDevice.currentTurnOrder <= newPosition;
        }
      })
      .forEach((sessionDevice) => {
        if (sessionDevice.currentTurnOrder === oldPosition) {
          movedSessionDevices.push({ id: sessionDevice.id, turnOrder: newPosition });
          this.gamingSessionsFacadeService.updateSessionDeviceTurnOrderCache(this.activeSession.id, sessionDevice.id, newPosition);
        } else {
          movedSessionDevices.push({
            id: sessionDevice.id,
            turnOrder: sessionDevice.currentTurnOrder + (movedDown ? 1 : -1),
          });
          this.gamingSessionsFacadeService.updateSessionDeviceTurnOrderCache(
            this.activeSession.id,
            sessionDevice.id,
            sessionDevice.currentTurnOrder + (movedDown ? 1 : -1),
          );
        }
      });

    this.gamingSessionsFacadeService.updateSessionDeviceSort(this.activeSession.id, movedSessionDevices);
  }

  editSession(): void {
    this.openSessionModal.next(createGamingSession(this.activeSession));
  }

  async setCurrentTurn(turn: number): Promise<void> {
    if (turn === this.activeSession.currentTurn) {
      return;
    }
    this.updating = true;
    try {
      await this.gamingSessionsFacadeService.updateSessionPromise(createGamingSession({ ...this.activeSession, ...{ currentTurn: turn } }));
    } catch (error) {
      this.nzMessageService.error("There was an error activating the player's turn");
    }

    this.updating = false;
  }

  async startSession(): Promise<void> {
    this.updating = true;
    try {
      await this.gamingSessionsFacadeService.updateSessionPromise(
        createGamingSession({ ...this.activeSession, ...{ startedAt: new Date() } }),
      );
      this.nzMessageService.success('Session started!');
    } catch (error) {
      this.nzMessageService.error('There was an error starting the session');
    }

    this.updating = false;
  }

  async endSession(): Promise<void> {
    try {
      await this.gamingSessionsFacadeService.updateSessionPromise(
        createGamingSession({ ...this.activeSession, ...{ endedAt: new Date() } }),
      );
      this.nzMessageService.success('Session ended!');
      await this.router.navigateByUrl('games');
    } catch (error) {
      this.nzMessageService.error('There was an error ending the session');
    }
  }

  async togglePause(): Promise<void> {
    this.updating = true;
    const isPaused = this.activeSession.isPaused;
    try {
      await this.gamingSessionsFacadeService.updateSessionPromise(
        createGamingSession({ ...this.activeSession, ...{ isPaused: !this.activeSession.isPaused } }),
      );
      this.nzMessageService.success(`Session ${isPaused ? 'resumed' : 'paused'}!`);
    } catch (error) {
      this.nzMessageService.error('There was an error pausing the session');
    }
    this.updating = false;
  }

  selectRandomFirstPlayer(): void {
    const randomPlayerIndex = Math.floor(Math.random() * this.activeSession.gamingSessionDevices.length);
    const sessionDevice = this.activeSession.gamingSessionDevices[randomPlayerIndex];
    this.nzModalService.confirm({
      nzTitle: 'First player is:',
      nzContent: `<b class="font-size">${sessionDevice.name}</b>`,
      nzStyle: { 'font-size': '20px !important' },
      nzOkText: 'Accept',
      nzCancelText: 'Cancel',
      nzOnOk: () =>
        this.dropSessionDevice({
          event: {
            previousIndex: randomPlayerIndex,
            currentIndex: 0,
          },
        }),
    });
  }

  disconnectFromSession(sessionDevice: GamingSessionDevice): void {
    this.nzModalService.warning({
      nzTitle: 'Are you sure?',
      nzContent: 'Disconnecting will remove you from this session',
      nzOkText: 'Disconnect',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.gamingSessionsFacadeService.deleteSessionDevice(
          this.activeSession.id,
          sessionDevice.id,
          this.userSessionDeviceId === sessionDevice.id,
        );
        void this.router.navigateByUrl('games');
      },
    });
  }
}
