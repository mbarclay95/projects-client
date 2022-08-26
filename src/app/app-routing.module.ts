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
import {MobileHeaderResolver} from "./mobile-header.resolver";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'events', component: EventSignupLayoutComponent, resolve: {MobileHeaderResolver}, data: {headerTitle: 'Signup'},
    loadChildren: () => import('./event-signup/event-signup.module').then(m => m.EventSignupModule)
  },
  {
    path: 'app', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {
        path: 'dashboard', component: DashboardLayoutComponent, resolve: {MobileHeaderResolver},
        data: {permission: Permissions.DASHBOARD_PAGE, headerTitle: 'Dashboard'},
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users', component: UsersLayoutComponent, resolve: {MobileHeaderResolver},
        data: {permission: Permissions.USERS_PAGE, headerTitle: 'Users'},
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'goals', component: GoalsLayoutComponent, resolve: {MobileHeaderResolver},
        data: {permission: Permissions.GOALS_PAGE, headerTitle: 'Goals'},
        loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule)
      },
      {
        path: 'backups', component: BackupsLayoutComponent, resolve: {MobileHeaderResolver},
        data: {permission: Permissions.BACKUPS_PAGE, headerTitle: 'Backups'},
        loadChildren: () => import('./backups/backups.module').then(m => m.BackupsModule)
      },
      {
        path: 'tasks', component: TasksLayoutComponent, resolve: {MobileHeaderResolver},
        data: {permission: Permissions.TASKS_PAGE, headerTitle: 'Tasks'},
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: 'events', component: EventsLayoutComponent, resolve: {MobileHeaderResolver},
        data: {permission: Permissions.EVENTS_PAGE, headerTitle: 'Events', showCreateButton: true},
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
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
