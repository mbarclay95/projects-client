import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UsersQuery } from '../../../users/services/state/users.query';
import { NzMessageService } from 'ng-zorro-antd/message';
import { createEvent, Event } from '../../models/event.model';
import { EventsService } from '../../services/events/state/events.service';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss'],
})
export class CreateEditEventComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Event>;

  event?: Event;
  isVisible: boolean = false;
  saving = false;
  modalWidth = isMobile ? '95%' : '700px';
  modalStyle = isMobile ? { top: '20px' } : {};

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private eventsService: EventsService,
    public usersQuery: UsersQuery,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((event) => {
      this.event = event.id === 0 ? event : createEvent(event);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveEvent() {
    if (!this.event) {
      return;
    }
    this.saving = true;
    try {
      this.event.id === 0
        ? await this.eventsService.createEvent(this.event)
        : await this.eventsService.updateEvent(this.event.id, this.event);
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error('There was an error saving the event.');
      return;
    }
    this.nzMessageService.success('Event Saved!');
    this.saving = false;
    this.isVisible = false;
  }

  updateNotifySwitch(checked: boolean) {
    if (!this.event) {
      return;
    }
    if (checked) {
      this.event.notificationEmail = '';
    } else {
      this.event.notificationEmail = undefined;
    }
  }
}
