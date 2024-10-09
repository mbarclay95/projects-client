import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GamingSession} from '../../models/gaming-session.model';
import {DatePipe} from '@angular/common';
import {DeviceOnlinePipe} from '../../pipes/device-online.pipe';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gaming-sessions-list',
  standalone: true,
  imports: [
    DatePipe,
    DeviceOnlinePipe,
    FaIconComponent
  ],
  templateUrl: './gaming-sessions-list.component.html',
  styleUrl: './gaming-sessions-list.component.scss'
})
export class GamingSessionsListComponent {
  @Input() sessions: GamingSession[] = [];
  @Output() editSession: EventEmitter<GamingSession> = new EventEmitter<GamingSession>();

  online = faCircleCheck;
  offline = faCircleXmark;

  constructor(
    private router: Router
  ) {
  }

  test(session: GamingSession): void {
    void this.router.navigateByUrl(`games/session/${session.id}`)
  }
}
