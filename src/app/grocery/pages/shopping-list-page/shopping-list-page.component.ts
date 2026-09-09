import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
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
  ],
})
export class ShoppingListPageComponent {
  isMobile = isMobile;

  readonly authStore = inject(AuthSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
}
