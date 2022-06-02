import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UsersStore, UsersState } from './users.store';
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {Role} from "../../models/role.model";

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState> {
  users$: Observable<User[]> = this.selectAll();

  constructor(
    protected override store: UsersStore
  ) {
    super(store);
  }

  getUsersByIds(ids: number[]): User[] {
    return this.getAll().filter(user => ids.includes(user.id));
  }

}
