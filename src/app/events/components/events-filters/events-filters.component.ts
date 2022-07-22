import {Component, Input, OnInit} from '@angular/core';
import {EventsUiState} from "../../services/events/state/events.store";
import {EventsService} from "../../services/events/state/events.service";

@Component({
  selector: 'app-events-filters',
  templateUrl: './events-filters.component.html',
  styleUrls: ['./events-filters.component.scss']
})
export class EventsFiltersComponent implements OnInit {
  @Input() ui!: EventsUiState;

  constructor(
    public eventsService: EventsService
  ) { }

  ngOnInit(): void {
  }

}
