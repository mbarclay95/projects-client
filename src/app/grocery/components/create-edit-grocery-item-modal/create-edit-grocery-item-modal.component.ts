import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GroceryItem } from '../../models/grocery-item.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { TagsSignalStore } from '../../../shared/services/tags-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-create-edit-grocery-item-modal',
  templateUrl: './create-edit-grocery-item-modal.component.html',
  styleUrls: ['./create-edit-grocery-item-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzModalFooterDirective,
    NzButtonComponent,
    NzPopconfirmDirective,
  ],
})
export class CreateEditGroceryItemModalComponent extends DefaultModalSignalComponent<GroceryItem> {
  deleting = false;

  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly tagsStore = inject(TagsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  saveItem() {
    if (!this.model) {
      return;
    }
    this.groceryItemsStore.upsert({ entity: this.model, onSuccess: () => this.itemSaved() });
  }

  itemSaved(): void {
    this.nzMessageService.success('Item Saved!');
    this.tagsStore.loadAll('grocery');
    this.groceryItemsStore.clearCreateEditEntity();
  }

  async deleteItem(): Promise<void> {
    if (!this.model) {
      return;
    }
    this.deleting = true;
    this.groceryItemsStore.remove({
      id: this.model.id,
      onSuccess: () => {
        this.nzMessageService.success('Item Deleted!');
        this.deleting = false;
        this.groceryItemsStore.clearCreateEditEntity();
      },
    });
  }
}
