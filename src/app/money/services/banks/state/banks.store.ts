import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Bank } from '../../../models/bank.model';

export interface BanksState extends EntityState<Bank> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'banks' })
export class BanksStore extends EntityStore<BanksState> {

  constructor() {
    super();
  }

}
