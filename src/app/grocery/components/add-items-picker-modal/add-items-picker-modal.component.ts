import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { GroceryStoreUnavailableItemsSignalStore } from '../../services/grocery-store-unavailable-items-signal-store';
import { createGroceryListItem } from '../../models/grocery-list-item.model';
import { createGroceryItem, filterGroceryItems, GroceryItem, GroceryItemUnit, newGroceryItemName } from '../../models/grocery-item.model';

@Component({
  selector: 'app-add-items-picker-modal',
  templateUrl: './add-items-picker-modal.component.html',
  styleUrls: ['./add-items-picker-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    NzInputDirective,
    NzInputGroupComponent,
    FormsModule,
    NzInputNumberComponent,
    NzButtonComponent,
    FaIconComponent,
  ],
})
export class AddItemsPickerModalComponent extends DefaultModalSignalComponent implements OnInit, OnDestroy {
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
  readonly groceryStoreUnavailableItemsStore = inject(GroceryStoreUnavailableItemsSignalStore);

  readonly searchText = signal('');
  readonly search = signal('');
  readonly filteredItems = computed(() => filterGroceryItems(this.groceryItemsStore.entities(), this.search(), []));
  readonly newItemName = computed(() => newGroceryItemName(this.groceryItemsStore.entities(), this.search()));
  readonly creatingItem = computed(() => this.groceryItemsStore.loadingOne() === 0);
  readonly quantities = signal<Map<number, number>>(new Map());

  readonly unavailableHere = computed(() => {
    const storeId = this.groceryListItemsStore.ui().storeId;
    if (storeId === null) {
      return new Set<number>();
    }
    return new Set(
      this.groceryStoreUnavailableItemsStore
        .entities()
        .filter((row) => row.groceryStoreId === storeId)
        .map((row) => row.groceryItemId),
    );
  });

  readonly groceryItemUnit = GroceryItemUnit;
  readonly plus = faPlus;
  readonly added = faCheckCircle;
  readonly clear = faXmark;

  private readonly search$ = new Subject<string>();
  private readonly subscriptionDestroyer = new Subject<void>();

  ngOnInit(): void {
    this.search$.pipe(debounceTime(200), takeUntil(this.subscriptionDestroyer)).subscribe((search) => this.search.set(search));
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  updateSearch(search: string): void {
    this.searchText.set(search);
    this.search$.next(search);
  }

  clearSearch(): void {
    this.updateSearch('');
    this.search.set('');
  }

  createAndAdd(name: string): void {
    this.groceryItemsStore.create({
      entity: createGroceryItem({ name }),
      onSuccess: (item) => this.toggle(item),
    });
  }

  quantityFor(item: GroceryItem): number {
    return this.quantities().get(item.id) ?? item.defaultQuantity ?? this.minFor(item);
  }

  setQuantity(item: GroceryItem, quantity: number): void {
    this.quantities.update((quantities) => new Map(quantities).set(item.id, quantity));
  }

  stepFor(item: GroceryItem): number {
    return item.unit === GroceryItemUnit.weight ? 0.1 : 1;
  }

  minFor(item: GroceryItem): number {
    return item.unit === GroceryItemUnit.weight ? 0.1 : 1;
  }

  toggle(item: GroceryItem): void {
    const entry = this.groceryListItemsStore.entryByGroceryItemId().get(item.id);
    if (entry) {
      this.groceryListItemsStore.remove({ id: entry.id });
    } else {
      const quantity = item.unit === GroceryItemUnit.none ? null : this.quantityFor(item);
      this.groceryListItemsStore.create({
        entity: createGroceryListItem({ groceryItemId: item.id, quantity }),
      });
    }
  }
}
