import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UsersStore, UsersState } from './users.store';
import {Observable} from "rxjs";
import {User} from "../../models/user.model";

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState> {
  users$: Observable<User[]> = this.selectAll();

  constructor(
    protected override store: UsersStore
  ) {
    super(store);
  }

}
