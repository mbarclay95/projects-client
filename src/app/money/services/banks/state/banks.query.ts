import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BanksStore, BanksState } from './banks.store';

@Injectable({ providedIn: 'root' })
export class BanksQuery extends QueryEntity<BanksState> {
  constructor(protected override store: BanksStore) {
    super(store);
  }
}
