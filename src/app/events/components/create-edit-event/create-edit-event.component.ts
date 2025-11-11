import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Event } from '../../models/event.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { EventsSignalStore } from '../../services/events-signal-store';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerComponent,
    NzSwitchComponent,
    NzInputNumberComponent,
  ],
})
export class CreateEditEventComponent extends DefaultModalSignalComponent<Event> {
  readonly eventsStore = inject(EventsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  saveEvent(): void {
    if (!this.model) {
      return;
    }
    this.eventsStore.upsert({ entity: this.model, onSuccess: () => this.eventSaved() });
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
