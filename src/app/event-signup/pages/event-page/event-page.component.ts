import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  openSignupModal: Subject<void> = new Subject<void>();

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit(): void {
  }

}
