import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FamiliesStore, FamiliesState } from './families.store';

@Injectable({ providedIn: 'root' })
export class FamiliesQuery extends QueryEntity<FamiliesState> {

  constructor(protected store: FamiliesStore) {
    super(store);
  }

}
