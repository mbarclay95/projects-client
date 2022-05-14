import {Injectable} from '@angular/core';
import {Permissions, Route} from "../permissions";
import {AuthQuery} from "./state/auth.query";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {faBullseye, faHome, faUpload, faUsers} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  usersRoutes$: Observable<Route[]> = this.authQuery.auth$.pipe(
    map(auth => this.routes.filter(route => auth.permissions.includes(route.permission)))
  );

  home = faHome;
  goals = faBullseye;
  users = faUsers;
  upload = faUpload;
  routes: Route[] = [
    {icon: this.home, url: 'app/dashboard', permission: Permissions.DASHBOARD_PAGE, title: 'Dashboard'},
    {icon: this.goals, url: 'app/goals', permission: Permissions.GOALS_PAGE, title: 'Goals'},
    {icon: this.users, url: 'app/users', permission: Permissions.USERS_PAGE, title: 'Users'},
    {icon: this.upload, url: 'app/backups', permission: Permissions.BACKUPS_PAGE, title: 'Backups'},
  ];

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


