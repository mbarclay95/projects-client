import { Component } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {GamingSegmentComponent} from '../../components/gaming-segment/gaming-segment.component';
import {GamingSessionsFacadeService} from '../../services/gaming-sessions-facade.service';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {MobileHeaderService} from '../../../shared/services/mobile-header.service';
import {Observable} from 'rxjs';
import {createGamingDevice, GamingDevice} from '../../models/gaming-device.model';
import {map} from 'rxjs/operators';
import {SharedModule} from '../../../shared/shared.module';
import {
  CreateEditDeviceModalComponent
} from '../../components/create-edit-device-modal/create-edit-device-modal.component';
import {GamingDevicesListComponent} from '../../components/gaming-devices-list/gaming-devices-list.component';

@Component({
  selector: 'app-gaming-sessions-admin-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    GamingSegmentComponent,
    NzSpinComponent,
    SharedModule,
    CreateEditDeviceModalComponent,
    GamingDevicesListComponent
  ],
  templateUrl: './gaming-sessions-admin-page.component.html',
  styleUrl: './gaming-sessions-admin-page.component.scss'
})
export class GamingSessionsAdminPageComponent {
  tab: 'sessions' | 'devices' = 'sessions';

  openModal$: Observable<GamingDevice> = this.mobileHeaderService.clickedButton$.pipe(
    map(() => createGamingDevice({}))
  );

  constructor(
    public gamingSessionsFacadeService: GamingSessionsFacadeService,
    private mobileHeaderService: MobileHeaderService
  ) {
  }

}
