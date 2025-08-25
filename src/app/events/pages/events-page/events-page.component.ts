import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isMobile } from '../../../app.component';
import { EventsSignalStore } from '../../services/events-signal-store';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  standalone: false,
})
export class EventsPageComponent {
  isMobile = isMobile;

  readonly eventsStore = inject(EventsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  async archiveEvent(eventId: number) {
    this.eventsStore.remove({ id: eventId, onSuccess: () => this.nzMessageService.success('Event archived!') });
  }
}
