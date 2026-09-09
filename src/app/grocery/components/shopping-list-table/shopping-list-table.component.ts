import { Component, input, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { formatGroceryListItemAmount, GroceryListItem } from '../../models/grocery-list-item.model';

@Component({
  selector: 'app-shopping-list-table',
  templateUrl: './shopping-list-table.component.html',
  styleUrls: ['./shopping-list-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzTagComponent,
  ],
})
export class ShoppingListTableComponent {
  @ViewChild('shoppingListTableTag', { static: true }) shoppingListTable: NzTableComponent<GroceryListItem> | undefined;

  entries = input.required<GroceryListItem[]>();

  formatGroceryListItemAmount = formatGroceryListItemAmount;
}
