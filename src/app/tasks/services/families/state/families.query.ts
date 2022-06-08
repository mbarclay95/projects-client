import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FamiliesStore, FamiliesState } from './families.store';
import {combineLatest, filter, Observable} from "rxjs";
import {Family} from "../../../models/family.model";
import {map} from "rxjs/operators";
import {User} from "../../../../users/models/user.model";
import {AuthQuery} from "../../../../auth/services/state/auth.query";

@Injectable({ providedIn: 'root' })
export class FamiliesQuery extends QueryEntity<FamiliesState> {
  families$: Observable<Family[]> = this.selectAll();

  myFamilyColor$: Observable<string> = this.selectActive().pipe(
    map(family => family?.color ?? '')
  );

  authUser$: Observable<User> = combineLatest([
    this.selectActive().pipe(
      filter(family => !!family)
    ),
    this.authQuery.auth$,
  ]).pipe(
    map(([family, auth]) => {
      return (family as Family).members.find(u => u.id === auth.id) as User;
    })
  )

  constructor(
    protected override store: FamiliesStore,
    private authQuery: AuthQuery
  ) {
    super(store);
  }

  get activeId(): number|undefined {
    return this.getActive()?.id;
  }

  getAuthMember(): User {
    const family = this.getActive() as Family;
    const auth = this.authQuery.getUser();

    return family.members.find(u => u.id === auth.id) as User;
  }
}
