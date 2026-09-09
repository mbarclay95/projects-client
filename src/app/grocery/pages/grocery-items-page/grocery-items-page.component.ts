import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { GroceryItemsFiltersComponent } from '../../components/grocery-items-filters/grocery-items-filters.component';
import { GroceryItemsTableComponent } from '../../components/grocery-items-table/grocery-items-table.component';
import { GroceryItemsTableMobileComponent } from '../../components/grocery-items-table-mobile/grocery-items-table-mobile.component';
import { CreateEditGroceryItemModalComponent } from '../../components/create-edit-grocery-item-modal/create-edit-grocery-item-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-grocery-items-page',
  templateUrl: './grocery-items-page.component.html',
  styleUrls: ['./grocery-items-page.component.scss'],
  imports: [
    NoGroceryGroupComponent,
    GroceryItemsFiltersComponent,
    GroceryItemsTableComponent,
    GroceryItemsTableMobileComponent,
    CreateEditGroceryItemModalComponent,
    NzModalModule,
  ],
})
export class GroceryItemsPageComponent {
  isMobile = isMobile;

  readonly authStore = inject(AuthSignalStore);
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
}
