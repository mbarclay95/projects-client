import {Injectable} from '@angular/core';
import {Permissions, Route} from "../permissions";
import {AuthQuery} from "./state/auth.query";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {
  faBullseye,
  faCalendarDays,
  faFolderOpen,
  faHome,
  faTasks,
  faUpload,
  faUser,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  usersRoutes$: Observable<Route[]> = this.authQuery.auth$.pipe(
    map(auth => this.routes.filter(route => route.permission === true || auth.clientPermissions.includes(route.permission)))
  );

  viewFamiliesTab$: Observable<boolean> = this.authQuery.auth$.pipe(
    map(auth => auth.clientPermissions.includes(Permissions.FAMILIES_TAB))
  );

  home = faHome;
  goals = faBullseye;
  users = faUsers;
  upload = faUpload;
  task = faTasks;
  event = faCalendarDays;
  user = faUser;
  files = faFolderOpen;
  isMobile = screen.width < 600;
  routes: Route[] = [
    {
      icon: this.home,
      url: 'app/dashboard',
      permission: Permissions.DASHBOARD_PAGE,
      title: 'Dashboard',
      queryParams: {}
    },
    {icon: this.goals, url: 'app/goals', permission: Permissions.GOALS_PAGE, title: 'Goals', queryParams: {}},
    {
      icon: this.upload,
      url: 'app/backups',
      permission: Permissions.BACKUPS_PAGE,
      title: 'Backups',
      queryParams: {tab: 'backups'}
    },
    {
      icon: this.task,
      url: `app/tasks${this.isMobile ? '/weekly-tasks' : ''}`,
      permission: Permissions.TASKS_PAGE,
      title: 'Tasks',
      queryParams: this.isMobile ? {} : {tab: 'weekly-tasks'}
    },
    {
      icon: this.files,
      url: 'app/file-explorer',
      permission: Permissions.FILE_EXPLORER_PAGE,
      title: 'File Explorer',
      queryParams: {}
    },
    {icon: this.event, url: 'app/events', permission: Permissions.EVENTS_PAGE, title: 'Events', queryParams: {}},
    {icon: this.users, url: 'app/users', permission: Permissions.USERS_PAGE, title: 'Users', queryParams: {}},
    // {icon: this.user, url: 'my-profile', permission: true, title: 'My Profile', queryParams: {}},
  ];

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


