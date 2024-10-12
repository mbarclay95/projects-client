import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GamingSession} from '../../models/gaming-session.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {
  faCircle,
  faEllipsisV,
  faGear, faGripVertical, faPause,
} from '@fortawesome/free-solid-svg-icons';
import {createGamingSessionDevice, GamingSessionDevice} from '../../models/gaming-session-device.model';
import {CdkDragHandle, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDropdownButtonDirective, NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';

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
  ],
  templateUrl: './joined-session.component.html',
  styleUrl: './joined-session.component.scss'
})
export class JoinedSessionComponent {
  @Input() activeSession!: GamingSession;
  @Input() userSessionDeviceId!: number;
  @Output() editSessionDevice: EventEmitter<GamingSessionDevice> = new EventEmitter<GamingSessionDevice>();

  button = faCircle;
  settings = faGear;
  more = faEllipsisV;
  grip = faGripVertical;
  pause = faPause;

  editClicked(sessionDevice: GamingSessionDevice): void {
    this.editSessionDevice.emit(createGamingSessionDevice(sessionDevice));
  }

  dropSessionDevice(event: any): void {
    console.log(event);
  }

}
