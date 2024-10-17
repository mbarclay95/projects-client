import {Component, EventEmitter, Input, Output} from '@angular/core';
import {createGamingSession, GamingSession} from '../../models/gaming-session.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {
  faCircle,
  faEllipsisV,
  faGear, faGripVertical, faPause, faPlay,
} from '@fortawesome/free-solid-svg-icons';
import {createGamingSessionDevice, GamingSessionDevice} from '../../models/gaming-session-device.model';
import {CdkDragHandle, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDropdownButtonDirective, NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {Subject} from 'rxjs';
import {CreateEditSessionModalComponent} from '../create-edit-session-modal/create-edit-session-modal.component';
import {GamingSessionsFacadeService} from '../../services/gaming-sessions-facade.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-joined-session',
  standalone: true,
  imports: [
    FaIconComponent,
    CdkDropList,
    CdkDragHandle,
    NgIf,
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
  styleUrl: './joined-session.component.scss'
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
  openSessionModal: Subject<GamingSession> = new Subject<GamingSession>();

  constructor(
    public gamingSessionsFacadeService: GamingSessionsFacadeService,
    private nzMessageService: NzMessageService
  ) {
  }

  editClicked(sessionDevice: GamingSessionDevice): void {
    this.editSessionDevice.emit(createGamingSessionDevice(sessionDevice));
  }

  dropSessionDevice({event}: { event: any }): void {
    const oldPosition = event.previousIndex + 1;
    const newPosition = event.currentIndex + 1;
    if (oldPosition === newPosition) {
      return;
    }

    const movedSessionDevices: { id: number, turnOrder: number }[] = [];
    const movedDown: boolean = oldPosition - newPosition > 0;

    this.activeSession.gamingSessionDevices.filter((sessionDevice) => {
      if (movedDown) {
        return sessionDevice.currentTurnOrder <= oldPosition && sessionDevice.currentTurnOrder >= newPosition;
      } else {
        return sessionDevice.currentTurnOrder >= oldPosition && sessionDevice.currentTurnOrder <= newPosition;
      }
    }).forEach(sessionDevice => {
      if (sessionDevice.currentTurnOrder === oldPosition) {
        movedSessionDevices.push({id: sessionDevice.id, turnOrder: newPosition});
        this.gamingSessionsFacadeService.updateSessionDeviceTurnOrderCache(this.activeSession.id, sessionDevice.id, newPosition);
      } else {
        movedSessionDevices.push({id: sessionDevice.id, turnOrder: sessionDevice.currentTurnOrder + (movedDown ? 1 : -1)});
        this.gamingSessionsFacadeService.updateSessionDeviceTurnOrderCache(this.activeSession.id, sessionDevice.id, sessionDevice.currentTurnOrder + (movedDown ? 1 : -1));
      }
    });

    this.gamingSessionsFacadeService.updateSessionDeviceSort(this.activeSession.id, movedSessionDevices);
  }

  editSession(): void {
    this.openSessionModal.next(createGamingSession(this.activeSession));
  }

  async startSession(): Promise<void> {
    this.updating = true;
    try {
      await this.gamingSessionsFacadeService.updateSessionPromise(createGamingSession({...this.activeSession, ...{startedAt: new Date()}}));
      this.nzMessageService.success('Session started!');
    } catch (error) {
      this.nzMessageService.error('There was an error starting the session');
    }

    this.updating = false;
  }

  async togglePause(): Promise<void> {
    try {
      await this.gamingSessionsFacadeService.updateSessionPromise(createGamingSession({...this.activeSession, ...{isPaused: !this.activeSession.isPaused}}));
      this.nzMessageService.success('Session paused!');
    } catch (error) {
      this.nzMessageService.error('There was an error pausing the session');
    }
  }
}
