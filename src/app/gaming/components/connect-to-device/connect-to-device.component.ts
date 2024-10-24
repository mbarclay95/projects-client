import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faChevronRight, faCircle} from '@fortawesome/free-solid-svg-icons';
import {AsyncPipe, DatePipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../../../shared/shared.module';
import {GamingDevice} from '../../models/gaming-device.model';
import {DeviceOnlinePipe} from '../../pipes/device-online.pipe';
import {createGamingSessionDevice, GamingSessionDevice} from '../../models/gaming-session-device.model';
import {GamingSession} from '../../models/gaming-session.model';

@Component({
  selector: 'app-connect-to-device',
  standalone: true,
  imports: [
    AsyncPipe,
    FaIconComponent,
    SharedModule,
    DatePipe,
    DeviceOnlinePipe
  ],
  templateUrl: './connect-to-device.component.html',
  styleUrl: './connect-to-device.component.scss'
})
export class ConnectToDeviceComponent {
  @Input() devices: GamingDevice[] = [];
  @Input() activeSession!: GamingSession;
  @Output() deviceSelected: EventEmitter<GamingSessionDevice> = new EventEmitter<GamingSessionDevice>();

  button = faCircle;
  arrow = faChevronRight;

  selectDevice(device: GamingDevice) {
    this.deviceSelected.emit(createGamingSessionDevice({
      gamingDevice: device,
      gamingSessionId: this.activeSession.id
    }));
  }
}
