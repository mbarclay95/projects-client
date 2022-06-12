import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {EventsStore, EventsState, EventsUiState} from './events.store';
import {Observable} from "rxjs";
import {Event} from "../../../models/event.model";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class EventsQuery extends QueryEntity<EventsState> {
  events$: Observable<Event[]> = this.selectAll();
  ui$: Observable<EventsUiState> = this.select().pipe(
    map(state => state.ui)
  );

  constructor(
    protected override store: EventsStore
  ) {
    super(store);
  }

  getUi(): EventsUiState {
    return this.getValue().ui;
  }

  getQueryString(): string {
    const ui = this.getUi();
    let queryString = `showArchived=${ui.showArchived}&`;
    if (ui.search) {
      queryString += `search=${ui.search}`;
    }

    return queryString;
  }

}
