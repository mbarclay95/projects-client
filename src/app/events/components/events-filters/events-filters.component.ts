import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventsUiState } from '../../services/events/state/events.store';
import { EventsService } from '../../services/events/state/events.service';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-events-filters',
  templateUrl: './events-filters.component.html',
  styleUrls: ['./events-filters.component.scss'],
})
export class EventsFiltersComponent implements OnInit, OnDestroy {
  @Input() ui!: EventsUiState;
  search$: Subject<string> = new Subject<string>();

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(public eventsService: EventsService) {}

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
      .subscribe((search) => this.eventsService.updateUi({ search }));
  }

  updateSearch(search: string) {
    this.search$.next(search);
  }
}
