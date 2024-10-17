import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GamingDevice} from '../../models/gaming-device.model';
import {DatePipe, NgIf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCircle, faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {DeviceOnlinePipe} from '../../pipes/device-online.pipe';

@Component({
  selector: 'app-gaming-devices-list',
  standalone: true,
  imports: [
    DatePipe,
    FaIconComponent,
    NgIf,
    DeviceOnlinePipe
  ],
  templateUrl: './gaming-devices-list.component.html',
  styleUrl: './gaming-devices-list.component.scss'
})
export class GamingDevicesListComponent {
  @Input() devices: GamingDevice[] = [];
  @Output() editDevice: EventEmitter<GamingDevice> = new EventEmitter<GamingDevice>();

  online = faCircleCheck;
  offline = faCircleXmark;
  button = faCircle;
}
