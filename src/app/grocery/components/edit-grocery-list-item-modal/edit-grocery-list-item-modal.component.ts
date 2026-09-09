import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { GroceryListItem } from '../../models/grocery-list-item.model';
import { GroceryItemUnit } from '../../models/grocery-item.model';

@Component({
  selector: 'app-edit-grocery-list-item-modal',
  templateUrl: './edit-grocery-list-item-modal.component.html',
  styleUrls: ['./edit-grocery-list-item-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    NzInputNumberComponent,
    FormsModule,
    NzButtonComponent,
    NzPopconfirmDirective,
  ],
})
export class EditGroceryListItemModalComponent extends DefaultModalSignalComponent<GroceryListItem> {
  removing = false;

  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  readonly groceryItemUnit = GroceryItemUnit;

  saveEntry(): void {
    if (!this.model) {
      return;
    }
    this.groceryListItemsStore.upsert({ entity: this.model, onSuccess: () => this.entrySaved() });
  }

  removeEntry(): void {
    if (!this.model) {
      return;
    }
    this.removing = true;
    this.groceryListItemsStore.remove({
      id: this.model.id,
      onSuccess: () => {
        this.removing = false;
        this.groceryListItemsStore.clearCreateEditEntity();
      },
    });
  }

  private entrySaved(): void {
    this.nzMessageService.success('Quantity Updated!');
    this.groceryListItemsStore.clearCreateEditEntity();
  }
}
