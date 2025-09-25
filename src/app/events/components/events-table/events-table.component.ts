import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import {
  faBoxArchive,
  faBoxOpen,
  faCopy,
  faEdit,
  faThumbsDown,
  faThumbsUp,
  faUpRightFromSquare,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { Event } from '../../models/event.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EventParticipant } from '../../models/event-participant';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
  standalone: false,
})
export class EventsTableComponent {
  @ViewChild('eventsTableTag', { static: true }) eventsTable: NzTableComponent<Event> | undefined;

  @Input() events: Event[] = [];
  @Input() loading!: boolean;

  @Output() editEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() archiveEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() editParticipant: EventEmitter<number> = new EventEmitter<number>();

  expandSet = new Set<number>();
  edit = faEdit;
  restore = faBoxOpen;
  copy = faCopy;
  open = faUpRightFromSquare;
  archive = faBoxArchive;
  participantGoing = faThumbsUp;
  participantNotGoing = faThumbsDown;
  participantChange = faUserPen;

  constructor(
    private clipboard: Clipboard,
    private nzMessageService: NzMessageService,
  ) {}

  onExpandChange(id: number, checked: boolean) {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  getPercent(participants: EventParticipant[], numOfPeople: number): number {
    return Math.ceil((participants.length / numOfPeople) * 100);
  }

  copyToClipboard(event: Event) {
    this.clipboard.copy(`${window.location.protocol}//${window.location.host}${event.eventUrl}`);
    this.nzMessageService.success('Event link copied!');
  }
}
