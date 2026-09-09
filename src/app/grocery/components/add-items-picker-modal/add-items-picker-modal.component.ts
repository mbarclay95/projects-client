import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { createGroceryListItem } from '../../models/grocery-list-item.model';
import { filterGroceryItems, GroceryItem, GroceryItemUnit } from '../../models/grocery-item.model';

@Component({
  selector: 'app-add-items-picker-modal',
  templateUrl: './add-items-picker-modal.component.html',
  styleUrls: ['./add-items-picker-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    NzInputDirective,
    FormsModule,
    NzInputNumberComponent,
    NzTagComponent,
    NzButtonComponent,
    FaIconComponent,
  ],
})
export class AddItemsPickerModalComponent extends DefaultModalSignalComponent implements OnInit, OnDestroy {
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);

  readonly search = signal('');
  readonly filteredItems = computed(() => filterGroceryItems(this.groceryItemsStore.entities(), this.search(), []));
  readonly quantities = signal<Map<number, number>>(new Map());

  readonly groceryItemUnit = GroceryItemUnit;
  readonly plus = faPlus;
  readonly added = faCheckCircle;

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
    this.search$.next(search);
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
