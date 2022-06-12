import {Injectable} from '@angular/core';
import {Permissions, Route} from "../permissions";
import {AuthQuery} from "./state/auth.query";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {faBullseye, faHome, faTasks, faUpload, faUsers} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  usersRoutes$: Observable<Route[]> = this.authQuery.auth$.pipe(
    map(auth => this.routes.filter(route => auth.clientPermissions.includes(route.permission)))
  );

  viewFamiliesTab$: Observable<boolean> = this.authQuery.auth$.pipe(
    map(auth => auth.clientPermissions.includes(Permissions.FAMILIES_TAB))
  );

  home = faHome;
  goals = faBullseye;
  users = faUsers;
  upload = faUpload;
  task = faTasks;
  routes: Route[] = [
    {icon: this.home, url: 'app/dashboard', permission: Permissions.DASHBOARD_PAGE, title: 'Dashboard', queryParams: {}},
    {icon: this.goals, url: 'app/goals', permission: Permissions.GOALS_PAGE, title: 'Goals', queryParams: {}},
    {icon: this.users, url: 'app/users', permission: Permissions.USERS_PAGE, title: 'Users', queryParams: {}},
    {icon: this.upload, url: 'app/backups', permission: Permissions.BACKUPS_PAGE, title: 'Backups', queryParams: {tab: 'backups'}},
    {icon: this.task, url: 'app/tasks', permission: Permissions.TASKS_PAGE, title: 'Tasks', queryParams: {tab: 'weekly-tasks'}},
  ];

  constructor(
    private authQuery: AuthQuery
  ) { }

  hasPermissionTo(permission: Permissions): boolean {
    const user = this.authQuery.getUser();
    if (!user) {
      return false;
    }

    return user.clientPermissions.includes(permission);
  }
}


