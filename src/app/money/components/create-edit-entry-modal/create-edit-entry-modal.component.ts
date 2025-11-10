import { Component, inject } from '@angular/core';
import { Entry } from '../../models/entry.model';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { EntriesSignalStore } from '../../services/entries-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-create-edit-entry-modal',
  templateUrl: './create-edit-entry-modal.component.html',
  styleUrls: ['./create-edit-entry-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzButtonComponent,
    FaIconComponent,
    NzDividerComponent,
    NzSelectComponent,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerComponent,
    NzModalFooterDirective,
    NzPopconfirmDirective,
  ],
})
export class CreateEditEntryModalComponent extends DefaultModalSignalComponent<Entry> {
  deleting = false;
  close = faXmark;
  next = faChevronRight;
  previous = faChevronLeft;

  readonly entriesStore = inject(EntriesSignalStore);

  async deleteEntry(): Promise<void> {}

  async saveEntry(): Promise<void> {}

  async saveEntryAndNext(): Promise<void> {
    await this.saveEntry();
  }
}
