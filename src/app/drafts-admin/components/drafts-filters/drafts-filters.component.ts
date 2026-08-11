import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DraftsSignalStore, DraftsUiState } from '../../services/drafts-signal-store';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-drafts-filters',
  templateUrl: './drafts-filters.component.html',
  styleUrls: ['./drafts-filters.component.scss'],
  imports: [NzInputDirective, ReactiveFormsModule, FormsModule, NzSwitchComponent],
})
export class DraftsFiltersComponent implements OnInit, OnDestroy {
  @Input() ui!: DraftsUiState;
  search$: Subject<string> = new Subject<string>();

  private subscriptionDestroyer: Subject<void> = new Subject<void>();
  readonly draftsStore = inject(DraftsSignalStore);

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
      .subscribe((search) => this.draftsStore.updateUiState({ search }));
  }

  updateSearch(search: string) {
    this.search$.next(search);
  }
}
