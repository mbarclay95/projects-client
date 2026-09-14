import { Component, inject } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';
import { GroceryItemsSignalStore } from '../services/grocery-items-signal-store';
import { GroceryListItemsSignalStore } from '../services/grocery-list-items-signal-store';
import { GroceryCategoriesSignalStore } from '../services/grocery-categories-signal-store';
import { GroceryStoresSignalStore } from '../services/grocery-stores-signal-store';
import { GroceryStoreItemCategoriesSignalStore } from '../services/grocery-store-item-categories-signal-store';
import { TagsSignalStore } from '../../shared/services/tags-signal-store';

@Component({
  selector: 'app-grocery-layout',
  templateUrl: './grocery-layout.component.html',
  styleUrls: ['./grocery-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class GroceryLayoutComponent {
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
  readonly groceryCategoriesStore = inject(GroceryCategoriesSignalStore);
  readonly groceryStoresStore = inject(GroceryStoresSignalStore);
  readonly groceryStoreItemCategoriesStore = inject(GroceryStoreItemCategoriesSignalStore);
  readonly tagsStore = inject(TagsSignalStore);

  constructor() {
    this.groceryItemsStore.loadAll({});
    this.groceryListItemsStore.loadAll({});
    this.groceryCategoriesStore.loadAll({});
    this.groceryStoresStore.loadAll({});
    this.groceryStoreItemCategoriesStore.loadAll({});
    this.tagsStore.loadAll('grocery');
  }
}
