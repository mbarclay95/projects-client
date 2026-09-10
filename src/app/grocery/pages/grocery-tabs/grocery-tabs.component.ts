import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzTabsComponent, NzTabComponent, NzTabLinkTemplateDirective, NzTabLinkDirective } from 'ng-zorro-antd/tabs';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { GroceryStoresSignalStore } from '../../services/grocery-stores-signal-store';
import { ShoppingListPageComponent } from '../shopping-list-page/shopping-list-page.component';
import { GroceryItemsPageComponent } from '../grocery-items-page/grocery-items-page.component';
import { GroceryStoresPageComponent } from '../grocery-stores-page/grocery-stores-page.component';

@Component({
  selector: 'app-grocery-tabs',
  templateUrl: './grocery-tabs.component.html',
  styleUrls: ['./grocery-tabs.component.scss'],
  imports: [
    NzTabsComponent,
    NzTabComponent,
    NzTabLinkTemplateDirective,
    NzTabLinkDirective,
    RouterLink,
    NzButtonComponent,
    ShoppingListPageComponent,
    GroceryItemsPageComponent,
    GroceryStoresPageComponent,
  ],
})
export class GroceryTabsComponent {
  selectedTab: 'Shopping List' | 'Master List' | 'Stores' = 'Shopping List';

  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
  readonly groceryStoresStore = inject(GroceryStoresSignalStore);

  createItem(): void {
    this.groceryItemsStore.createEntity();
  }

  addItems(): void {
    this.groceryListItemsStore.openPicker();
  }

  createStore(): void {
    this.groceryStoresStore.createEntity();
  }
}
