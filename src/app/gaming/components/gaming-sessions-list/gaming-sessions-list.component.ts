import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { GamingSession } from '../../models/gaming-session.model';
import { DatePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gaming-sessions-list',
  imports: [DatePipe, FaIconComponent],
  templateUrl: './gaming-sessions-list.component.html',
  styleUrl: './gaming-sessions-list.component.scss',
})
export class GamingSessionsListComponent {
  private router = inject(Router);

  @Input() sessions: GamingSession[] = [];
  @Input() forAdmin = false;
  @Output() editSession: EventEmitter<GamingSession> = new EventEmitter<GamingSession>();

  online = faCircleCheck;
  offline = faCircleXmark;

  test(session: GamingSession): void {
    void this.router.navigateByUrl(`games/session/${session.id}`);
  }

  protected readonly arrow = faChevronRight;
}
