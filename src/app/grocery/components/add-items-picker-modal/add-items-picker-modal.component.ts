import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { TagsSignalStore } from '../../../shared/services/tags-signal-store';
import { createGroceryListItem } from '../../models/grocery-list-item.model';
import { filterGroceryItems, formatGroceryItemAmount, GroceryItem } from '../../models/grocery-item.model';

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
    NzSelectComponent,
    NzOptionComponent,
    NzTagComponent,
    NzButtonComponent,
    FaIconComponent,
  ],
})
export class AddItemsPickerModalComponent extends DefaultModalSignalComponent implements OnInit, OnDestroy {
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
  readonly tagsStore = inject(TagsSignalStore);

  readonly search = signal('');
  readonly tags = signal<string[]>([]);
  readonly filteredItems = computed(() => filterGroceryItems(this.groceryItemsStore.entities(), this.search(), this.tags()));

  readonly plus = faPlus;
  readonly added = faCheckCircle;

  formatGroceryItemAmount = formatGroceryItemAmount;

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

  toggle(item: GroceryItem): void {
    const entry = this.groceryListItemsStore.entryByGroceryItemId().get(item.id);
    if (entry) {
      this.groceryListItemsStore.remove({ id: entry.id });
    } else {
      this.groceryListItemsStore.create({
        entity: createGroceryListItem({ groceryItemId: item.id, quantity: item.defaultQuantity }),
      });
    }
  }
}
