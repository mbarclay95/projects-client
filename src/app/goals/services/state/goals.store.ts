import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Goal } from '../../models/goal.model';

export interface GoalsState extends EntityState<Goal> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'goals' })
export class GoalsStore extends EntityStore<GoalsState> {

  constructor() {
    super();
  }

}
