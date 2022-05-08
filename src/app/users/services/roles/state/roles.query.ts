import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RolesStore, RolesState } from './roles.store';
import {Observable} from "rxjs";
import {Role} from "../../../models/role.model";

@Injectable({ providedIn: 'root' })
export class RolesQuery extends QueryEntity<RolesState> {
  roles$: Observable<Role[]> = this.selectAll();

  constructor(
    protected override store: RolesStore
  ) {
    super(store);
  }

  getRolesByIds(ids: number[]): Role[] {
    return this.getAll().filter(role => ids.includes(role.id));
  }

}
