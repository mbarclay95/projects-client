import { Component, inject, signal } from '@angular/core';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { GroceryStoresSignalStore } from '../../services/grocery-stores-signal-store';
import { GroceryStore } from '../../models/grocery-store.model';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { CreateEditGroceryStoreModalComponent } from '../../components/create-edit-grocery-store-modal/create-edit-grocery-store-modal.component';
import { GroceryStoreExceptionsModalComponent } from '../../components/grocery-store-exceptions-modal/grocery-store-exceptions-modal.component';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grocery-stores-page',
  templateUrl: './grocery-stores-page.component.html',
  styleUrls: ['./grocery-stores-page.component.scss'],
  imports: [
    NoGroceryGroupComponent,
    CreateEditGroceryStoreModalComponent,
    GroceryStoreExceptionsModalComponent,
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzButtonComponent,
    NzPopconfirmDirective,
    NzEmptyComponent,
    FaIconComponent,
  ],
})
export class GroceryStoresPageComponent {
  readonly authStore = inject(AuthSignalStore);
  readonly groceryStoresStore = inject(GroceryStoresSignalStore);

  readonly exceptionsForStore = signal<GroceryStore | undefined>(undefined);

  edit = faEdit;
  trash = faTrash;
  exceptionsIcon = faList;

  deleteStore(id: number): void {
    this.groceryStoresStore.remove({ id });
  }
}
