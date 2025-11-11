import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Subject } from 'rxjs';
import { EventCacheService } from '../../services/event-cache.service';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { EventParticipantModalComponent } from '../../components/event-participant-modal/event-participant-modal.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
  imports: [NzDividerComponent, NzButtonComponent, EventParticipantModalComponent, AsyncPipe, DatePipe, NzModalModule],
})
export class EventPageComponent implements OnInit {
  openSignupModal: Subject<void> = new Subject<void>();

  constructor(
    public eventService: EventService,
    public eventCacheService: EventCacheService,
  ) {}

  ngOnInit(): void {}
}
