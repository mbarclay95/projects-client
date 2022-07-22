import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {faBoxArchive, faCopy, faEdit, faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {Event} from "../../models/event.model";

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
  copy = faCopy;
  open = faUpRightFromSquare;
  archive = faBoxArchive;

  constructor() {
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
}
