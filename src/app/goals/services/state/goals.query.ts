import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GoalsStore, GoalsState } from './goals.store';
import {Observable} from "rxjs";
import {Goal} from "../../models/goal.model";

@Injectable({ providedIn: 'root' })
export class GoalsQuery extends QueryEntity<GoalsState> {
  goals$: Observable<Goal[]> = this.selectAll();

  constructor(
    protected override store: GoalsStore
  ) {
    super(store);
  }

}
