import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventsUiState} from "../../services/events/state/events.store";
import {createEvent, Event} from "../../models/event.model";
import {EventsService} from "../../services/events/state/events.service";

@Component({
  selector: 'app-events-filters',
  templateUrl: './events-filters.component.html',
  styleUrls: ['./events-filters.component.scss']
})
export class EventsFiltersComponent implements OnInit {
  @Input() ui!: EventsUiState;
  @Output() createEvent: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(
    public eventsService: EventsService
  ) { }

  ngOnInit(): void {
  }

  createNewEvent() {
    this.createEvent.emit(createEvent({id: 0}));
  }

}
