import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { GamingDevice } from '../../models/gaming-device.model';
import { createGamingSessionDevice, GamingSessionDevice } from '../../models/gaming-session-device.model';
import { GamingSession } from '../../models/gaming-session.model';

@Component({
  selector: 'app-connect-to-device',
  imports: [FaIconComponent],
  templateUrl: './connect-to-device.component.html',
  styleUrl: './connect-to-device.component.scss',
})
export class ConnectToDeviceComponent {
  @Input() devices: GamingDevice[] = [];
  @Input() activeSession!: GamingSession;
  @Output() deviceSelected: EventEmitter<GamingSessionDevice> = new EventEmitter<GamingSessionDevice>();

  button = faCircle;
  arrow = faChevronRight;

  selectDevice(device: GamingDevice) {
    this.deviceSelected.emit(
      createGamingSessionDevice({
        gamingDevice: device,
        gamingSessionId: this.activeSession.id,
      }),
    );
  }
}
