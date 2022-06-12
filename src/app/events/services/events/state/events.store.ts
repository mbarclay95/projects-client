import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Event} from '../../../models/event.model';

export interface EventsState extends EntityState<Event> {
  ui: EventsUiState
}

export interface EventsUiState {
  showArchived: boolean;
  search: string | null;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'events'})
export class EventsStore extends EntityStore<EventsState> {

  constructor() {
    super({ui: {showArchived: false, search: null}});
  }

}
