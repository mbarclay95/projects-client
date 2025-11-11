import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { GamingSegmentComponent } from '../../components/gaming-segment/gaming-segment.component';
import { GamingSessionsFacadeService } from '../../services/gaming-sessions-facade.service';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { MobileDisplayService } from '../../../shared/services/mobile-display.service';
import { Observable, Subject, merge } from 'rxjs';
import { createGamingDevice, GamingDevice } from '../../models/gaming-device.model';
import { map } from 'rxjs/operators';
import { CreateEditDeviceModalComponent } from '../../components/create-edit-device-modal/create-edit-device-modal.component';
import { GamingDevicesListComponent } from '../../components/gaming-devices-list/gaming-devices-list.component';
import { createGamingSession, GamingSession } from '../../models/gaming-session.model';
import { GamingSessionsListComponent } from '../../components/gaming-sessions-list/gaming-sessions-list.component';
import { CreateEditSessionModalComponent } from '../../components/create-edit-session-modal/create-edit-session-modal.component';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gaming-sessions-admin-page',
  imports: [
    AsyncPipe,
    GamingSegmentComponent,
    NzSpinComponent,
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
  gamingSessionsFacadeService = inject(GamingSessionsFacadeService);
  private mobileHeaderService = inject(MobileDisplayService);

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
}
