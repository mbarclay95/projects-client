import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { GroceryItemsFiltersComponent } from '../../components/grocery-items-filters/grocery-items-filters.component';
import { GroceryItemsTableComponent } from '../../components/grocery-items-table/grocery-items-table.component';
import { CreateEditGroceryItemModalComponent } from '../../components/create-edit-grocery-item-modal/create-edit-grocery-item-modal.component';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-grocery-items-page',
  templateUrl: './grocery-items-page.component.html',
  styleUrls: ['./grocery-items-page.component.scss'],
  imports: [
    PageHeaderComponent,
    GroceryItemsFiltersComponent,
    GroceryItemsTableComponent,
    CreateEditGroceryItemModalComponent,
    NzEmptyComponent,
  ],
})
export class GroceryItemsPageComponent {
  isMobile = isMobile;

  readonly authStore = inject(AuthSignalStore);
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);

  createItem(): void {
    this.groceryItemsStore.createEntity();
  }
}
