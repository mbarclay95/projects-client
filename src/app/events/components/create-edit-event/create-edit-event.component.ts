import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Event } from '../../models/event.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { EventsSignalStore } from '../../services/events-signal-store';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss'],
  standalone: false,
})
export class CreateEditEventComponent extends DefaultModalSignalComponent<Event> {
  readonly eventsStore = inject(EventsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  saveEvent(): void {
    if (!this.model) {
      return;
    }
    this.model.id === 0
      ? this.eventsStore.create({ entity: this.model, onSuccess: () => this.eventSaved() })
      : this.eventsStore.update({ entity: this.model, onSuccess: () => this.eventSaved() });
  }

  eventSaved(): void {
    this.nzMessageService.success('Event Saved!');
    this.eventsStore.clearCreateEditEntity();
  }

  updateNotifySwitch(checked: boolean): void {
    if (!this.model) {
      return;
    }
    if (checked) {
      this.model.notificationEmail = '';
    } else {
      this.model.notificationEmail = undefined;
    }
  }
}
