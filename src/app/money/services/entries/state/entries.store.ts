import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Entry } from '../../../models/entry.model';

export interface EntriesState extends EntityState<Entry> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'entries' })
export class EntriesStore extends EntityStore<EntriesState> {
  constructor() {
    super();
  }
}
