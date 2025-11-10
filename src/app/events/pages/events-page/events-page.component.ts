import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isMobile } from '../../../app.component';
import { EventsSignalStore } from '../../services/events-signal-store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { EventsFiltersComponent } from '../../components/events-filters/events-filters.component';
import { MobileEventsTableComponent } from '../../components/mobile-events-table/mobile-events-table.component';
import { EventsTableComponent } from '../../components/events-table/events-table.component';
import { CreateEditEventComponent } from '../../components/create-edit-event/create-edit-event.component';
import { EditParticipantModalComponent } from '../../components/edit-participant-modal/edit-participant-modal.component';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  imports: [
    PageHeaderComponent,
    EventsFiltersComponent,
    MobileEventsTableComponent,
    EventsTableComponent,
    CreateEditEventComponent,
    EditParticipantModalComponent,
  ],
})
export class EventsPageComponent {
  isMobile = isMobile;

  readonly eventsStore = inject(EventsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  async archiveEvent(eventId: number) {
    this.eventsStore.remove({ id: eventId, onSuccess: () => this.nzMessageService.success('Event archived!') });
  }
}
