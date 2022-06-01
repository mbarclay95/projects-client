import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Family } from '../../../models/family.model';

export interface FamiliesState extends EntityState<Family> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'families' })
export class FamiliesStore extends EntityStore<FamiliesState> {

  constructor() {
    super();
  }

}
