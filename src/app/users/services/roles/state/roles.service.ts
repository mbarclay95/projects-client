import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolesStore } from './roles.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {createRole, Role} from "../../../models/role.model";

@Injectable({ providedIn: 'root' })
export class RolesService {

  constructor(
    private rolesStore: RolesStore,
    private http: HttpClient
  ) {
  }

  async getRoles() {
    await firstValueFrom(this.http.get<Role[]>(`${environment.apiUrl}/roles`).pipe(
      map(roles => roles.map(role => createRole(role))),
      tap(roles => this.rolesStore.set(roles))
    ));
  }



}
