import { Component, input, output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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
    NzCheckboxComponent,
    FormsModule,
    NzButtonComponent,
    FaIconComponent,
  ],
})
export class ShoppingListTableComponent {
  @ViewChild('shoppingListTableTag', { static: true }) shoppingListTable: NzTableComponent<GroceryListItem> | undefined;

  entries = input.required<GroceryListItem[]>();

  markBought = output<GroceryListItem>();
  editEntry = output<number>();

  edit = faEdit;

  formatGroceryListItemAmount = formatGroceryListItemAmount;
}
