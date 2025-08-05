import { Component } from '@angular/core';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { Entry } from '../../models/entry.model';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-edit-entry-modal',
  templateUrl: './create-edit-entry-modal.component.html',
  styleUrls: ['./create-edit-entry-modal.component.scss'],
  standalone: false,
})
export class CreateEditEntryModalComponent extends DefaultModalComponent<Entry> {
  deleting = false;
  close = faXmark;
  next = faChevronRight;
  previous = faChevronLeft;

  constructor() {
    super();
  }

  async deleteEntry(): Promise<void> {}

  async saveEntry(): Promise<void> {}

  async saveEntryAndNext(): Promise<void> {
    await this.saveEntry();
  }
}
