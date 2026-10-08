import { Component, input, output } from '@angular/core';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { MobileListComponent, MobileListRowComponent } from '../../../shared/components/mobile-list/mobile-list.component';
import { formatGroceryItemAmount, GroceryItem } from '../../models/grocery-item.model';

@Component({
  selector: 'app-grocery-items-table-mobile',
  templateUrl: './grocery-items-table-mobile.component.html',
  imports: [NzEmptyComponent, MobileListComponent, MobileListRowComponent],
})
export class GroceryItemsTableMobileComponent {
  items = input.required<GroceryItem[]>();

  editItem = output<number>();

  formatGroceryItemAmount = formatGroceryItemAmount;

  detailsFor(item: GroceryItem): string {
    return [item.category, ...item.tags].filter(Boolean).join(' · ');
  }
}
