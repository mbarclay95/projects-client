import { Component, input } from '@angular/core';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { formatGroceryListItemAmount, GroceryListItem } from '../../models/grocery-list-item.model';

@Component({
  selector: 'app-shopping-list-table-mobile',
  templateUrl: './shopping-list-table-mobile.component.html',
  styleUrls: ['./shopping-list-table-mobile.component.scss'],
  imports: [NzTagComponent, NzEmptyComponent],
})
export class ShoppingListTableMobileComponent {
  entries = input.required<GroceryListItem[]>();

  formatGroceryListItemAmount = formatGroceryListItemAmount;
}
