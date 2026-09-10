import { Component, input, output } from '@angular/core';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { formatGroceryListItemAmount, GroceryListItem } from '../../models/grocery-list-item.model';
import { ShoppingListGroup } from '../../models/shopping-list-sort';

@Component({
  selector: 'app-shopping-list-table-mobile',
  templateUrl: './shopping-list-table-mobile.component.html',
  styleUrls: ['./shopping-list-table-mobile.component.scss'],
  imports: [NzTagComponent, NzEmptyComponent, NzCheckboxComponent, FormsModule],
})
export class ShoppingListTableMobileComponent {
  groups = input.required<ShoppingListGroup[]>();

  markBought = output<GroceryListItem>();
  editEntry = output<number>();

  formatGroceryListItemAmount = formatGroceryListItemAmount;
}
