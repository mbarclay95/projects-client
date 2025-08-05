import { Component, OnInit } from '@angular/core';
import { EventsQuery } from '../../services/events/state/events.query';
import { Observable, Subject, merge } from 'rxjs';
import { createEvent, Event } from '../../models/event.model';
import { EventsService } from '../../services/events/state/events.service';
import { EventParticipant } from '../../models/event-participant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MobileHeaderService } from '../../../shared/services/mobile-header.service';
import { map } from 'rxjs/operators';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  openEventModal: Subject<Event> = new Subject<Event>();
  isMobile = isMobile;
  openEventModal$: Observable<Event> = merge(
    this.mobileHeaderService.clickedButton$.pipe(map(() => createEvent({}))),
    this.openEventModal.asObservable(),
  );
  openParticipantModal: Subject<EventParticipant> = new Subject<EventParticipant>();

  constructor(
    public eventsQuery: EventsQuery,
    public eventsService: EventsService,
    private nzMessageService: NzMessageService,
    private mobileHeaderService: MobileHeaderService,
  ) {}

  ngOnInit(): void {}

  createNewEvent() {
    this.openEventModal.next(createEvent({ id: 0 }));
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
}
