import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersLayoutComponent} from "./users/users-layout/users-layout.component";
import {AuthLayoutComponent} from "./auth/auth-layout/auth-layout.component";
import {AuthGuard} from "./auth/services/auth.guard";
import {Permissions} from "./auth/permissions";
import {GoalsLayoutComponent} from "./goals/goals-layout/goals-layout.component";
import {BackupsLayoutComponent} from "./backups/backups-layout/backups-layout.component";
import {DashboardLayoutComponent} from "./dashboard/dashboard-layout/dashboard-layout.component";
import {TasksLayoutComponent} from "./tasks/tasks-layout/tasks-layout.component";
import {EventsLayoutComponent} from "./events/events-layout/events-layout.component";
import {EventSignupLayoutComponent} from "./event-signup/event-signup-layout/event-signup-layout.component";
import {FileExplorerLayoutComponent} from './file-explorer/file-explorer-layout/file-explorer-layout.component';
import {AppResolver} from './app.resolver';
import {MoneyLayoutComponent} from './money/money-layout/money-layout.component';
import {LoggingLayoutComponent} from './logging/logging-layout/logging-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'events', component: EventSignupLayoutComponent, resolve: {AppResolver}, data: {headerTitle: 'Signup'},
    loadChildren: () => import('./event-signup/event-signup.module').then(m => m.EventSignupModule)
  },
  {
    path: 'app', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {
        path: 'dashboard', component: DashboardLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.DASHBOARD_PAGE, headerTitle: 'Dashboard'},
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users', component: UsersLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.USERS_PAGE, headerTitle: 'Users'},
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'goals', component: GoalsLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.GOALS_PAGE, headerTitle: 'Goals', showCreateButton: true},
        loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule)
      },
      {
        path: 'backups', component: BackupsLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.BACKUPS_PAGE, headerTitle: 'Backups'},
        loadChildren: () => import('./backups/backups.module').then(m => m.BackupsModule)
      },
      {
        path: 'tasks', component: TasksLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.TASKS_PAGE, headerTitle: 'Tasks'},
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: 'events', component: EventsLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.EVENTS_PAGE, headerTitle: 'Events', showCreateButton: true},
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'file-explorer', component: FileExplorerLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.FILE_EXPLORER_PAGE, headerTitle: 'File Explorer', showCreateButton: true},
        loadChildren: () => import('./file-explorer/file-explorer.module').then(m => m.FileExplorerModule)
      },
      {
        path: 'money', component: MoneyLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.MONEY_APP_PAGE, headerTitle: 'Money'},
        loadChildren: () => import('./money/money.module').then(m => m.MoneyModule)
      },
      {
        path: 'logging', component: LoggingLayoutComponent, resolve: {AppResolver},
        data: {permission: Permissions.LOGGING_PAGE, headerTitle: 'Logging'},
        loadChildren: () => import('./logging/logging.module').then(m => m.LoggingModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
