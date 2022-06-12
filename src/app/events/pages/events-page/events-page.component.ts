import { Component, OnInit } from '@angular/core';
import {EventsQuery} from "../../services/events/state/events.query";
import {Subject} from "rxjs";
import {Event} from "../../models/event.model";

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  openModal: Subject<Event> = new Subject<Event>();

  constructor(
    public eventsQuery: EventsQuery
  ) { }

  ngOnInit(): void {
  }

}
