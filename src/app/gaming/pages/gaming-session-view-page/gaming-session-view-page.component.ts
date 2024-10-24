import { Component } from '@angular/core';
import {GamingSessionsFacadeService} from '../../services/gaming-sessions-facade.service';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {AsyncPipe} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ConnectToDeviceComponent} from '../../components/connect-to-device/connect-to-device.component';
import {Subject} from 'rxjs';
import {GamingSessionDevice} from '../../models/gaming-session-device.model';
import {
  CreateEditSessionDeviceModalComponent
} from '../../components/create-edit-session-device-modal/create-edit-session-device-modal.component';
import {JoinedSessionComponent} from '../../components/joined-session/joined-session.component';
import {NzResultComponent, NzResultExtraDirective} from 'ng-zorro-antd/result';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-gaming-session-view-page',
  standalone: true,
  imports: [
    NzSpinComponent,
    AsyncPipe,
    SharedModule,
    FaIconComponent,
    ConnectToDeviceComponent,
    CreateEditSessionDeviceModalComponent,
    JoinedSessionComponent,
    NzResultComponent,
    NzResultExtraDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './gaming-session-view-page.component.html',
  styleUrl: './gaming-session-view-page.component.scss'
})
export class GamingSessionViewPageComponent {
  openModal: Subject<GamingSessionDevice> = new Subject<GamingSessionDevice>();

  constructor(
    public gamingSessionsFacadeService: GamingSessionsFacadeService,
  ) {
  }

}
