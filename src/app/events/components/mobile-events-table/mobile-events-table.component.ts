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
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzProgressComponent } from 'ng-zorro-antd/progress';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzListComponent, NzListItemComponent } from 'ng-zorro-antd/list';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { DatePipe } from '@angular/common';
import { ParticipantsGoingPipe } from '../../pipes/participants-going.pipe';

@Component({
  selector: 'app-mobile-events-table',
  templateUrl: './mobile-events-table.component.html',
  styleUrls: ['./mobile-events-table.component.scss'],
  imports: [
    NzSpinComponent,
    NzProgressComponent,
    FaIconComponent,
    NzPopconfirmDirective,
    NzDividerComponent,
    NzListComponent,
    NzListItemComponent,
    NzEmptyComponent,
    DatePipe,
    ParticipantsGoingPipe,
  ],
})
export class MobileEventsTableComponent implements OnInit {
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
