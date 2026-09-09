import { Component, inject } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';
import { GroceryItemsSignalStore } from '../services/grocery-items-signal-store';
import { TagsSignalStore } from '../../shared/services/tags-signal-store';

@Component({
  selector: 'app-grocery-layout',
  templateUrl: './grocery-layout.component.html',
  styleUrls: ['./grocery-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class GroceryLayoutComponent {
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly tagsStore = inject(TagsSignalStore);

  constructor() {
    this.groceryItemsStore.loadAll({});
    this.tagsStore.loadAll('grocery');
  }
}
