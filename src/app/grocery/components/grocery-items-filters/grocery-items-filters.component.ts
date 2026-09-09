import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GroceryItemsSignalStore, GroceryUiState } from '../../services/grocery-items-signal-store';
import { TagsSignalStore } from '../../../shared/services/tags-signal-store';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-grocery-items-filters',
  templateUrl: './grocery-items-filters.component.html',
  styleUrls: ['./grocery-items-filters.component.scss'],
  imports: [NzInputDirective, FormsModule, NzSelectComponent, NzOptionComponent],
})
export class GroceryItemsFiltersComponent implements OnInit, OnDestroy {
  ui = input.required<GroceryUiState>();

  search$: Subject<string> = new Subject<string>();

  private subscriptionDestroyer: Subject<void> = new Subject<void>();
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly tagsStore = inject(TagsSignalStore);

  ngOnInit(): void {
    this.subscribeToSearch();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  subscribeToSearch() {
    this.search$
      .pipe(debounceTime(200), takeUntil(this.subscriptionDestroyer))
      .subscribe((search) => this.groceryItemsStore.updateUiState({ search }, false));
  }

  updateSearch(search: string) {
    this.search$.next(search);
  }
}
