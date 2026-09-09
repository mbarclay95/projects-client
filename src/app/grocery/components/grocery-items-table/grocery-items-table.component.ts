import { Component, input, output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { GroceryItem } from '../../models/grocery-item.model';

@Component({
  selector: 'app-grocery-items-table',
  templateUrl: './grocery-items-table.component.html',
  styleUrls: ['./grocery-items-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    FaIconComponent,
    NzTagComponent,
    NzButtonComponent,
  ],
})
export class GroceryItemsTableComponent {
  @ViewChild('groceryItemsTableTag', { static: true }) groceryItemsTable: NzTableComponent<GroceryItem> | undefined;

  items = input.required<GroceryItem[]>();

  editItem = output<number>();

  edit = faEdit;
}
