import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { ShoppingListTableComponent } from '../../components/shopping-list-table/shopping-list-table.component';
import { ShoppingListTableMobileComponent } from '../../components/shopping-list-table-mobile/shopping-list-table-mobile.component';

@Component({
  selector: 'app-shopping-list-page',
  templateUrl: './shopping-list-page.component.html',
  styleUrls: ['./shopping-list-page.component.scss'],
  imports: [NoGroceryGroupComponent, ShoppingListTableComponent, ShoppingListTableMobileComponent],
})
export class ShoppingListPageComponent {
  isMobile = isMobile;

  readonly authStore = inject(AuthSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
}
