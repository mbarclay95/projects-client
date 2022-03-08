import { Injectable } from '@angular/core';
import {Permissions} from "../permissions";
import {AuthQuery} from "./state/auth.query";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private authQuery: AuthQuery
  ) { }

  hasPermissionTo(permission: Permissions): boolean {
    const user = this.authQuery.getUser();
    if (!user) {
      return false;
    }

    return user.permissions.includes(permission);
  }

}
