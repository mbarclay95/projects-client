import { Component, OnInit } from '@angular/core';
import {EventsQuery} from "../../services/events/state/events.query";
import {Subject} from "rxjs";
import {createEvent, Event} from "../../models/event.model";
import {EventsService} from "../../services/events/state/events.service";
import {EventParticipant} from "../../models/event-participant";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  openModal: Subject<Event> = new Subject<Event>();

  constructor(
    public eventsQuery: EventsQuery,
    public eventsService: EventsService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  createNewEvent() {
    this.openModal.next(createEvent({id: 0}));
  }

  async archiveEvent(event: Event) {
    try {
      await this.eventsService.archiveEvent(event);
    } catch (e) {
      this.nzMessageService.error('There was an error archiving the event.');
      return;
    }

    this.nzMessageService.success('Event archived!');
  }

  async removeParticipant(participant: EventParticipant) {
    try {
      await this.eventsService.removeParticipant(participant);
    } catch (e) {
      this.nzMessageService.error('There was an error removing the participant.');
      return;
    }

    this.nzMessageService.success(`${participant.name} removed!`);
  }
}
