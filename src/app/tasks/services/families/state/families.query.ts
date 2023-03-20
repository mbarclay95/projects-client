import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {FamiliesStore, FamiliesState} from './families.store';
import {combineLatest, filter, Observable, OperatorFunction, pipe, UnaryFunction} from "rxjs";
import {Family, TaskStrategy} from "../../../models/family.model";
import {map} from "rxjs/operators";
import {User} from "../../../../users/models/user.model";
import {AuthQuery} from "../../../../auth/services/state/auth.query";

@Injectable({providedIn: 'root'})
export class FamiliesQuery extends QueryEntity<FamiliesState> {
  families$: Observable<Family[]> = this.selectAll();

  myFamilyColor$: Observable<string> = this.selectActive().pipe(
    map(family => family?.color ?? '')
  );

  myFamily$: Observable<Family> = this.selectActive().pipe(
    filterNullish()
  );

  familyTaskStrategy$: Observable<TaskStrategy> = this.myFamily$.pipe(
    map(myFamily => myFamily.taskStrategy)
  );

  isPerTaskPoint$: Observable<boolean> = this.familyTaskStrategy$.pipe(
    map(strategy => strategy === 'per task point')
  );

  taskPoints$: Observable<number[]> = this.myFamily$.pipe(
    map(myFamily => [...myFamily.taskPoints].sort((a, b) => a > b ? 1 : -1))
  );

  authUser$: Observable<User> = combineLatest([
    this.myFamily$,
    this.authQuery.auth$,
  ]).pipe(
    map(([family, auth]) => {
      return (family as Family).members.find(u => u.id === auth.id) as User;
    })
  );

  constructor(
    protected override store: FamiliesStore,
    private authQuery: AuthQuery
  ) {
    super(store);
  }

  get activeId(): number | undefined {
    return this.getActive()?.id;
  }

  getAuthMember(): User {
    const family = this.getActive() as Family;
    const auth = this.authQuery.getUser();

    return family.members.find(u => u.id === auth.id) as User;
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
  return pipe(
    filter(x => !!x) as OperatorFunction<T | null | undefined, T>
  );
}
