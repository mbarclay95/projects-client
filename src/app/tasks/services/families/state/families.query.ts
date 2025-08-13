import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FamiliesStore, FamiliesState } from './families.store';
import { filter, Observable, OperatorFunction, pipe, UnaryFunction } from 'rxjs';
import { Family, TaskStrategy } from '../../../models/family.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FamiliesQuery extends QueryEntity<FamiliesState> {
  families$: Observable<Family[]> = this.selectAll();

  myFamily$: Observable<Family> = this.selectActive().pipe(filterNullish());

  familyTaskStrategy$: Observable<TaskStrategy> = this.myFamily$.pipe(map((myFamily) => myFamily.taskStrategy));

  isPerTaskPoint$: Observable<boolean> = this.familyTaskStrategy$.pipe(map((strategy) => strategy === 'per task point'));

  taskPoints$: Observable<number[]> = this.myFamily$.pipe(map((myFamily) => [...myFamily.taskPoints].sort((a, b) => (a > b ? 1 : -1))));

  constructor(protected override store: FamiliesStore) {
    super(store);
  }

  get activeId(): number | undefined {
    return this.getActive()?.id;
  }

  getMinTaskPoint(): number | undefined {
    const taskPoints = this.getActive()?.taskPoints;
    if (!taskPoints) {
      return;
    }

    return Math.min(...[...taskPoints]);
  }

  getMaxTaskPoint(): number | undefined {
    const taskPoints = this.getActive()?.taskPoints;
    if (!taskPoints) {
      return;
    }

    return Math.max(...[...taskPoints]);
  }
}

export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(filter((x) => !!x) as OperatorFunction<T | null | undefined, T>);
}
