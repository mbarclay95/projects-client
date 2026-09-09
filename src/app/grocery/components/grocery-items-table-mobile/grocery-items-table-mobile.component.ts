import { Component, input, output } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { formatGroceryItemAmount, GroceryItem } from '../../models/grocery-item.model';

@Component({
  selector: 'app-grocery-items-table-mobile',
  templateUrl: './grocery-items-table-mobile.component.html',
  styleUrls: ['./grocery-items-table-mobile.component.scss'],
  imports: [FaIconComponent, NzPopconfirmDirective, NzTagComponent, NzEmptyComponent],
})
export class GroceryItemsTableMobileComponent {
  items = input.required<GroceryItem[]>();

  editItem = output<number>();
  deleteItem = output<number>();

  edit = faEdit;
  trash = faTrash;

  formatGroceryItemAmount = formatGroceryItemAmount;
}
