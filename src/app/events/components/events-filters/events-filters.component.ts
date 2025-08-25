import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EventsSignalStore, EventsUiState } from '../../services/events-signal-store';

@Component({
  selector: 'app-events-filters',
  templateUrl: './events-filters.component.html',
  styleUrls: ['./events-filters.component.scss'],
  standalone: false,
})
export class EventsFiltersComponent implements OnInit, OnDestroy {
  @Input() ui!: EventsUiState;
  search$: Subject<string> = new Subject<string>();

  private subscriptionDestroyer: Subject<void> = new Subject<void>();
  readonly eventsStore = inject(EventsSignalStore);

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
      .subscribe((search) => this.eventsStore.updateUiState({ search }));
  }

  updateSearch(search: string) {
    this.search$.next(search);
  }
}
