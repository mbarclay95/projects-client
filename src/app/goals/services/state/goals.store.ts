import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Goal} from '../../models/goal.model';

export interface GoalsState extends EntityState<Goal> {
  ui: GoalsUiState
}

export interface GoalsUiState {
  weekOffset: number | null
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'goals'})
export class GoalsStore extends EntityStore<GoalsState> {

  constructor() {
    super({ui: {weekOffset: 0}});
  }

}
