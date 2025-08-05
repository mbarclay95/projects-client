import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EntriesStore, EntriesState } from './entries.store';
import { Observable } from 'rxjs';
import { Entry } from '../../../models/entry.model';

@Injectable({ providedIn: 'root' })
export class EntriesQuery extends QueryEntity<EntriesState> {
  entries$: Observable<Entry[]> = this.selectAll();

  constructor(protected override store: EntriesStore) {
    super(store);
  }
}
