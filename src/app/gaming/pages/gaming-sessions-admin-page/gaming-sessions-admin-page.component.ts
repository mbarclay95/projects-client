import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { GamingSegmentComponent } from '../../components/gaming-segment/gaming-segment.component';
import { GamingSessionsFacadeService } from '../../services/gaming-sessions-facade.service';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { MobileHeaderService } from '../../../shared/services/mobile-header.service';
import { Observable, Subject, merge } from 'rxjs';
import { createGamingDevice, GamingDevice } from '../../models/gaming-device.model';
import { map } from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';
import { CreateEditDeviceModalComponent } from '../../components/create-edit-device-modal/create-edit-device-modal.component';
import { GamingDevicesListComponent } from '../../components/gaming-devices-list/gaming-devices-list.component';
import { createGamingSession, GamingSession } from '../../models/gaming-session.model';
import { GamingSessionsListComponent } from '../../components/gaming-sessions-list/gaming-sessions-list.component';
import { CreateEditSessionModalComponent } from '../../components/create-edit-session-modal/create-edit-session-modal.component';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gaming-sessions-admin-page',
  standalone: true,
  imports: [
    AsyncPipe,
    GamingSegmentComponent,
    NzSpinComponent,
    SharedModule,
    CreateEditDeviceModalComponent,
    GamingDevicesListComponent,
    GamingSessionsListComponent,
    CreateEditSessionModalComponent,
    NzSwitchComponent,
    FormsModule,
  ],
  templateUrl: './gaming-sessions-admin-page.component.html',
  styleUrl: './gaming-sessions-admin-page.component.scss',
})
export class GamingSessionsAdminPageComponent {
  tab: 'sessions' | 'devices' = 'sessions';
  editDevice: Subject<GamingDevice> = new Subject<GamingDevice>();
  editSession: Subject<GamingSession> = new Subject<GamingSession>();
  openDeviceModal$: Observable<GamingDevice> = merge(
    this.mobileHeaderService.clickedButton$.pipe(map(() => createGamingDevice({}))),
    this.editDevice.asObservable(),
  );
  openSessionModal$: Observable<GamingSession> = merge(
    this.mobileHeaderService.clickedButton$.pipe(map(() => createGamingSession({}))),
    this.editSession.asObservable(),
  );

  constructor(
    public gamingSessionsFacadeService: GamingSessionsFacadeService,
    private mobileHeaderService: MobileHeaderService,
  ) {}
}
