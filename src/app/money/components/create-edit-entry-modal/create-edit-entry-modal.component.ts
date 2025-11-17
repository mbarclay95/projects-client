import { Component, inject } from '@angular/core';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { IncompleteEntriesSignalStore } from '../../services/incomplete-entries-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { IncompleteEntry, isEntryComplete } from '../../models/entry.model';
import { BanksSignalStore } from '../../services/banks-signal-store';
import { CategorySelectComponent } from '../category-select/category-select.component';
import { SubCategory } from '../../models/sub-category.model';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategoryTagsSignalStore } from '../../services/category-tags-signal-store';

@Component({
  selector: 'app-create-edit-entry-modal',
  templateUrl: './create-edit-entry-modal.component.html',
  styleUrls: ['./create-edit-entry-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzButtonComponent,
    NzSelectComponent,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerComponent,
    NzModalFooterDirective,
    NzPopconfirmDirective,
    NzOptionComponent,
    CategorySelectComponent,
    CurrencyMaskModule,
  ],
})
export class CreateEditEntryModalComponent extends DefaultModalSignalComponent<IncompleteEntry> {
  deleting = false;
  saving = false;
  savingCompleted = false;
  // close = faXmark;
  // next = faChevronRight;
  // previous = faChevronLeft;

  readonly incompleteEntriesStore = inject(IncompleteEntriesSignalStore);
  readonly banksStore = inject(BanksSignalStore);
  readonly categoryTagsStore = inject(CategoryTagsSignalStore);

  deleteEntry(): void {
    if (!this.model) {
      return;
    }
    this.deleting = true;
    this.incompleteEntriesStore.remove({
      id: this.model.id,
      onSuccess: () => {
        this.deleting = false;
        this.incompleteEntriesStore.clearCreateEditEntity();
      },
    });
  }

  saveEntry(): void {
    if (!this.model) {
      return;
    }
    this.saving = true;
    this.incompleteEntriesStore.upsert({
      entity: this.model,
      onSuccess: () => {
        this.saving = false;
        this.incompleteEntriesStore.clearCreateEditEntity();
      },
    });
  }

  saveEntryAndComplete(): void {
    if (!this.model) {
      return;
    }
    this.savingCompleted = true;
    this.incompleteEntriesStore.completeEntry({
      entity: this.model,
      onSuccess: () => {
        this.savingCompleted = false;
        this.incompleteEntriesStore.clearCreateEditEntity();
      },
    });
  }

  selectedSubcategory(subCategory: SubCategory | null) {
    if (!this.model) {
      return;
    }
    this.model.category = subCategory?.category ?? null;
    this.model.subCategory = subCategory;
  }

  compareModels<T extends { id: number }>(a: T, b: T): boolean {
    if (!a || !b) {
      return false;
    }

    return a.id === b.id;
  }

  completeDisabled(): boolean {
    if (!this.model) {
      return true;
    }

    return !isEntryComplete(this.model);
  }
}
