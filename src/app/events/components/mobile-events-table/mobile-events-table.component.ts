import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventParticipant } from '../../models/event-participant';
import {
  faBoxArchive,
  faBoxOpen,
  faChevronDown,
  faChevronUp,
  faCircleMinus,
  faCopy,
  faEdit,
  faThumbsDown,
  faThumbsUp,
  faUpRightFromSquare,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-mobile-events-table',
  templateUrl: './mobile-events-table.component.html',
  styleUrls: ['./mobile-events-table.component.scss'],
  standalone: false,
})
export class MobileEventsTableComponent implements OnInit {
  @Input() set events(events: Event[] | null) {
    if (events) {
      this._events = events;
    }
  }

  @Output() editEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() archiveEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() editParticipant: EventEmitter<EventParticipant> = new EventEmitter<EventParticipant>();

  _events: Event[] = [];
  expandSet = new Set<number>();
  edit = faEdit;
  restore = faBoxOpen;
  copy = faCopy;
  open = faUpRightFromSquare;
  archive = faBoxArchive;
  participantGoing = faThumbsUp;
  participantNotGoing = faThumbsDown;
  remove = faCircleMinus;
  arrowDown = faChevronDown;
  arrowUp = faChevronUp;
  participantChange = faUserPen;

  constructor(
    private clipboard: Clipboard,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit() {}

  getPercent(participants: EventParticipant[], numOfPeople: number): number {
    return Math.ceil((participants.length / numOfPeople) * 100);
  }

  copyToClipboard(event: Event) {
    this.clipboard.copy(`${window.location.protocol}//${window.location.host}${event.eventUrl}`);
    this.nzMessageService.success('Event link copied!');
  }
}
