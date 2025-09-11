import { Component, inject } from '@angular/core';
import { Entry } from '../../models/entry.model';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { EntriesSignalStore } from '../../services/entries-signal-store';

@Component({
  selector: 'app-create-edit-entry-modal',
  templateUrl: './create-edit-entry-modal.component.html',
  styleUrls: ['./create-edit-entry-modal.component.scss'],
  standalone: false,
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
