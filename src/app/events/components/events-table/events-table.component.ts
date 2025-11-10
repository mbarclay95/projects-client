import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
  NzTdAddOnComponent,
  NzTrExpandDirective,
  NzTableFixedRowComponent,
} from 'ng-zorro-antd/table';
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
import { NzProgressComponent } from 'ng-zorro-antd/progress';
import { NzCollapseComponent } from 'ng-zorro-antd/collapse';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzListComponent, NzListItemComponent } from 'ng-zorro-antd/list';
import { DatePipe } from '@angular/common';
import { ParticipantsGoingPipe } from '../../pipes/participants-going.pipe';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzTdAddOnComponent,
    NzProgressComponent,
    NzTrExpandDirective,
    NzTableFixedRowComponent,
    NzCollapseComponent,
    FaIconComponent,
    NzPopconfirmDirective,
    NzListComponent,
    NzListItemComponent,
    DatePipe,
    ParticipantsGoingPipe,
  ],
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
