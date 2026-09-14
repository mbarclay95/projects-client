import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { isMobile } from '../../../app.component';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { GroceryStoresSignalStore } from '../../services/grocery-stores-signal-store';
import { GroceryCategoriesSignalStore } from '../../services/grocery-categories-signal-store';
import { GroceryStoreItemCategoriesSignalStore } from '../../services/grocery-store-item-categories-signal-store';
import { groupShoppingList } from '../../models/shopping-list-sort';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { ShoppingListTableComponent } from '../../components/shopping-list-table/shopping-list-table.component';
import { ShoppingListTableMobileComponent } from '../../components/shopping-list-table-mobile/shopping-list-table-mobile.component';
import { AddItemsPickerModalComponent } from '../../components/add-items-picker-modal/add-items-picker-modal.component';
import { EditGroceryListItemModalComponent } from '../../components/edit-grocery-list-item-modal/edit-grocery-list-item-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-shopping-list-page',
  templateUrl: './shopping-list-page.component.html',
  styleUrls: ['./shopping-list-page.component.scss'],
  imports: [
    NoGroceryGroupComponent,
    ShoppingListTableComponent,
    ShoppingListTableMobileComponent,
    AddItemsPickerModalComponent,
    EditGroceryListItemModalComponent,
    NzModalModule,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
  ],
})
export class ShoppingListPageComponent {
  isMobile = isMobile;

  readonly authStore = inject(AuthSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
  readonly groceryStoresStore = inject(GroceryStoresSignalStore);
  readonly groceryCategoriesStore = inject(GroceryCategoriesSignalStore);
  readonly groceryStoreItemCategoriesStore = inject(GroceryStoreItemCategoriesSignalStore);

  selectedStore = computed(
    () => this.groceryStoresStore.entities().find((store) => store.id === this.groceryListItemsStore.ui().storeId) ?? null,
  );

  groups = computed(() =>
    groupShoppingList(
      this.groceryListItemsStore.entities(),
      this.selectedStore(),
      this.groceryStoreItemCategoriesStore.byStoreAndItem(),
      this.groceryCategoriesStore.entities(),
    ),
  );
}
