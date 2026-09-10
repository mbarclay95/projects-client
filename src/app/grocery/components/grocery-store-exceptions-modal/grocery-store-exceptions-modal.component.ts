import { Component, computed, inject, output, signal } from '@angular/core';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryStore } from '../../models/grocery-store.model';
import { createGroceryStoreItemCategory } from '../../models/grocery-store-item-category.model';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { GroceryCategoriesSignalStore } from '../../services/grocery-categories-signal-store';
import { GroceryStoreItemCategoriesSignalStore } from '../../services/grocery-store-item-categories-signal-store';

@Component({
  selector: 'app-grocery-store-exceptions-modal',
  templateUrl: './grocery-store-exceptions-modal.component.html',
  styleUrls: ['./grocery-store-exceptions-modal.component.scss'],
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
export class GroceryStoreExceptionsModalComponent extends DefaultModalSignalComponent<GroceryStore> {
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryCategoriesStore = inject(GroceryCategoriesSignalStore);
  readonly groceryStoreItemCategoriesStore = inject(GroceryStoreItemCategoriesSignalStore);

  readonly closed = output<void>();

  readonly arrow = faArrowRight;
  readonly minus = faMinus;
  readonly plus = faPlus;

  readonly newItemId = signal<number | null>(null);
  readonly newCategoryId = signal<number | null>(null);

  readonly exceptions = computed(() => {
    const store = this.openModal();
    if (!store) {
      return [];
    }
    return this.groceryStoreItemCategoriesStore.entities().filter((exception) => exception.groceryStoreId === store.id);
  });

  readonly availableItems = computed(() => {
    const exceptedItemIds = new Set(this.exceptions().map((exception) => exception.groceryItemId));
    return this.groceryItemsStore.entities().filter((item) => !exceptedItemIds.has(item.id));
  });

  override onCloseModal(): void {
    this.newItemId.set(null);
    this.newCategoryId.set(null);
  }

  itemName(itemId: number): string {
    return this.groceryItemsStore.entities().find((item) => item.id === itemId)?.name ?? '';
  }

  categoryName(categoryId: number): string {
    return this.groceryCategoriesStore.entities().find((category) => category.id === categoryId)?.name ?? '';
  }

  removeException(id: number): void {
    this.groceryStoreItemCategoriesStore.remove({ id });
  }

  addException(): void {
    const store = this.openModal();
    const itemId = this.newItemId();
    const categoryId = this.newCategoryId();
    if (!store || itemId === null || categoryId === null) {
      return;
    }

    this.groceryStoreItemCategoriesStore.create({
      entity: createGroceryStoreItemCategory({ groceryStoreId: store.id, groceryItemId: itemId, groceryCategoryId: categoryId }),
      onSuccess: () => {
        this.newItemId.set(null);
        this.newCategoryId.set(null);
      },
    });
  }
}
