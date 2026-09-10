import { Component, computed, inject, linkedSignal } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryStore } from '../../models/grocery-store.model';
import { GroceryStoresSignalStore } from '../../services/grocery-stores-signal-store';
import { GroceryCategoriesSignalStore } from '../../services/grocery-categories-signal-store';
import { CdkDragDrop, CdkDragHandle, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { faGripVertical, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-create-edit-grocery-store-modal',
  templateUrl: './create-edit-grocery-store-modal.component.html',
  styleUrls: ['./create-edit-grocery-store-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    NzInputDirective,
    FormsModule,
    NzButtonComponent,
    NzEmptyComponent,
    CdkDropList,
    CdkDragHandle,
    DragDropModule,
    FaIconComponent,
  ],
})
export class CreateEditGroceryStoreModalComponent extends DefaultModalSignalComponent<GroceryStore> {
  readonly groceryStoresStore = inject(GroceryStoresSignalStore);
  readonly groceryCategoriesStore = inject(GroceryCategoriesSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  grip = faGripVertical;
  plus = faPlus;
  minus = faMinus;

  /**
   * Resets to the opened store's saved order whenever a different store is
   * opened, but dragging and the +/- buttons overwrite it locally in between.
   * `model` is a plain field `DefaultModalSignalComponent` assigns from an
   * effect, so only `openModal()` is reactive here.
   */
  orderedCategoryIds = linkedSignal(() => this.openModal()?.categoryOrder ?? []);

  orderedCategories = computed(() =>
    this.orderedCategoryIds()
      .map((id) => this.groceryCategoriesStore.entities().find((category) => category.id === id))
      .filter((category) => category !== undefined),
  );

  unorderedCategories = computed(() => {
    const ordered = new Set(this.orderedCategoryIds());
    return this.groceryCategoriesStore.entities().filter((category) => !ordered.has(category.id));
  });

  drop(event: CdkDragDrop<number[]>): void {
    const ids = [...this.orderedCategoryIds()];
    moveItemInArray(ids, event.previousIndex, event.currentIndex);
    this.orderedCategoryIds.set(ids);
  }

  addCategory(categoryId: number): void {
    this.orderedCategoryIds.set([...this.orderedCategoryIds(), categoryId]);
  }

  removeCategory(categoryId: number): void {
    this.orderedCategoryIds.set(this.orderedCategoryIds().filter((id) => id !== categoryId));
  }

  saveStore(): void {
    if (!this.model) {
      return;
    }
    this.model.categoryOrder = this.orderedCategoryIds();
    this.groceryStoresStore.upsert({ entity: this.model, onSuccess: () => this.storeSaved() });
  }

  storeSaved(): void {
    this.nzMessageService.success('Store Saved!');
    this.groceryStoresStore.clearCreateEditEntity();
  }
}
