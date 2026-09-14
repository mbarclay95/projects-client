import { Component, computed, inject, output, signal } from '@angular/core';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryStore } from '../../models/grocery-store.model';
import { createGroceryStoreUnavailableItem } from '../../models/grocery-store-unavailable-item.model';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { GroceryStoreUnavailableItemsSignalStore } from '../../services/grocery-store-unavailable-items-signal-store';

@Component({
  selector: 'app-grocery-store-unavailable-items-modal',
  templateUrl: './grocery-store-unavailable-items-modal.component.html',
  styleUrls: ['./grocery-store-unavailable-items-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    NzButtonComponent,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    FaIconComponent,
  ],
})
export class GroceryStoreUnavailableItemsModalComponent extends DefaultModalSignalComponent<GroceryStore> {
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryStoreUnavailableItemsStore = inject(GroceryStoreUnavailableItemsSignalStore);

  readonly closed = output<void>();

  readonly minus = faMinus;
  readonly plus = faPlus;

  readonly newItemId = signal<number | null>(null);

  readonly unavailableItems = computed(() => {
    const store = this.openModal();
    if (!store) {
      return [];
    }
    return this.groceryStoreUnavailableItemsStore.entities().filter((row) => row.groceryStoreId === store.id);
  });

  readonly availableItems = computed(() => {
    const unavailableItemIds = new Set(this.unavailableItems().map((row) => row.groceryItemId));
    return this.groceryItemsStore.entities().filter((item) => !unavailableItemIds.has(item.id));
  });

  override onCloseModal(): void {
    this.newItemId.set(null);
  }

  itemName(itemId: number): string {
    return this.groceryItemsStore.entities().find((item) => item.id === itemId)?.name ?? '';
  }

  removeItem(id: number): void {
    this.groceryStoreUnavailableItemsStore.remove({ id });
  }

  addItem(): void {
    const store = this.openModal();
    const itemId = this.newItemId();
    if (!store || itemId === null) {
      return;
    }

    this.groceryStoreUnavailableItemsStore.create({
      entity: createGroceryStoreUnavailableItem({ groceryStoreId: store.id, groceryItemId: itemId }),
      onSuccess: () => {
        this.newItemId.set(null);
      },
    });
  }
}
