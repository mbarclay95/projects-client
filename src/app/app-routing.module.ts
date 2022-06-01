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

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {
        path: 'dashboard', component: DashboardLayoutComponent, data: {permission: Permissions.DASHBOARD_PAGE},
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users', component: UsersLayoutComponent, data: {permission: Permissions.USERS_PAGE},
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'goals', component: GoalsLayoutComponent, data: {permission: Permissions.GOALS_PAGE},
        loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule)
      },
      {
        path: 'backups', component: BackupsLayoutComponent, data: {permission: Permissions.BACKUPS_PAGE},
        loadChildren: () => import('./backups/backups.module').then(m => m.BackupsModule)
      },
      {
        path: 'tasks', component: TasksLayoutComponent, data: {permission: Permissions.TASKS_PAGE},
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
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
