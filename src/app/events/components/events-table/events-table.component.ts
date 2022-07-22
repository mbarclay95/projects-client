import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {faBoxArchive, faBoxOpen, faCopy, faEdit, faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {Event} from "../../models/event.model";
import { Clipboard } from '@angular/cdk/clipboard';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent implements OnInit {
  @ViewChild('eventsTableTag', {static: true}) eventsTable: NzTableComponent<Event> | undefined;

  @Input() set events(events: Event[] | null) {
    if (events) {
      this._events = events;
    }
  }

  @Output() editEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() archiveEvent: EventEmitter<Event> = new EventEmitter<Event>();

  _events: Event[] = [];
  expandSet = new Set<number>();
  edit = faEdit;
  restore = faBoxOpen;
  copy = faCopy;
  open = faUpRightFromSquare;
  archive = faBoxArchive;

  constructor(
    private clipboard: Clipboard,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }

  onExpandChange(id: number, checked: boolean) {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  getPercent(event: Event): number {
    return (event.eventParticipants.length / event.numOfPeople) * 100;
  }

  copyToClipboard(event: Event) {
    this.clipboard.copy(`${window.location.protocol}//${window.location.host}${event.eventUrl}`);
    this.nzMessageService.success('Event link copied!');
  }
}
