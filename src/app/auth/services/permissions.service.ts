import {Injectable} from '@angular/core';
import {Permissions} from "../permissions";
import {AuthQuery} from "./state/auth.query";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Route, routes} from '../../shared/models/routes.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  usersRoutes$: Observable<Route[]> = this.authQuery.auth$.pipe(
    map(auth => routes.filter(route => route.permission === true || auth.clientPermissions.includes(route.permission)))
  );

  viewFamiliesTab$: Observable<boolean> = this.authQuery.auth$.pipe(
    map(auth => auth.clientPermissions.includes(Permissions.FAMILIES_TAB))
  );

  constructor(
    private authQuery: AuthQuery
  ) {
  }

  hasPermissionTo(permission?: Permissions): boolean {
    const user = this.authQuery.getUser();
    if (!user) {
      return false;
    }
    if (!permission) {
      return true;
    }

    return user.clientPermissions.includes(permission);
  }
}


