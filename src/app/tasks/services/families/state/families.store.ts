import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Family } from '../../../models/family.model';

export interface FamiliesState extends EntityState<Family>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'families' })
export class FamiliesStore extends EntityStore<FamiliesState> {
  constructor() {
    super();
  }
}
