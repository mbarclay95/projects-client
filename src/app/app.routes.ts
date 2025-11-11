import { Data, Route } from '@angular/router';
import { Permissions } from './auth/permissions';
import { CreateButtonAction, MobileFooterButtons } from './shared/services/mobile-display.service';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { EventSignupLayoutComponent } from './event-signup/event-signup-layout/event-signup-layout.component';
import { tryAuthGuard } from './auth/services/try-auth.guard';
import { GamingLayoutComponent } from './gaming/gaming-layout/gaming-layout.component';
import { authGuard } from './auth/services/auth.guard';
import { authChildGuard } from './auth/services/auth-child.guard';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { UsersLayoutComponent } from './users/users-layout/users-layout.component';
import { GoalsLayoutComponent } from './goals/goals-layout/goals-layout.component';
import { BackupsLayoutComponent } from './backups/backups-layout/backups-layout.component';
import { TasksLayoutComponent } from './tasks/tasks-layout/tasks-layout.component';
import { EventsLayoutComponent } from './events/events-layout/events-layout.component';
import { FileExplorerLayoutComponent } from './file-explorer/file-explorer-layout/file-explorer-layout.component';
import { MoneyLayoutComponent } from './money/money-layout/money-layout.component';
import { LoggingLayoutComponent } from './logging/logging-layout/logging-layout.component';

export interface TypedData extends Data {
  headerTitle?: string;
  permission?: Permissions;
  createButtonAction?: CreateButtonAction;
  footerButtons?: MobileFooterButtons;
}

export interface TypedRoute extends Route {
  data?: TypedData;
  children?: TypedRoute[];
}

export const APP_ROUTES: TypedRoute[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'events',
    component: EventSignupLayoutComponent,
    data: { headerTitle: 'Signup' },
    loadChildren: () => import('./event-signup/event-signup.routes').then((m) => m.EVENT_SIGNUP_ROUTES),
  },
  {
    path: 'games',
    canActivate: [tryAuthGuard],
    component: GamingLayoutComponent,
    data: { headerTitle: 'Games' },
    loadChildren: () => import('./gaming/gaming.routes').then((m) => m.GAMING_ROUTES),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        data: { permission: Permissions.DASHBOARD_PAGE, headerTitle: 'Dashboard' },
        loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'users',
        component: UsersLayoutComponent,
        data: { permission: Permissions.USERS_PAGE, headerTitle: 'Users' },
        loadChildren: () => import('./users/users.routes').then((m) => m.USERS_ROUTES),
      },
      {
        path: 'goals',
        component: GoalsLayoutComponent,
        data: { permission: Permissions.GOALS_PAGE, headerTitle: 'Goals', createButtonAction: 'goals' },
        loadChildren: () => import('./goals/goals.routes').then((m) => m.GOALS_ROUTES),
      },
      {
        path: 'backups',
        component: BackupsLayoutComponent,
        data: { permission: Permissions.BACKUPS_PAGE, headerTitle: 'Backups' },
        loadChildren: () => import('./backups/backups.routes').then((m) => m.BACKUPS_ROUTES),
      },
      {
        path: 'tasks',
        component: TasksLayoutComponent,
        data: { permission: Permissions.TASKS_PAGE, headerTitle: 'Tasks' },
        loadChildren: () => import('./tasks/tasks.routes').then((m) => m.TASK_ROUTES),
      },
      {
        path: 'events',
        component: EventsLayoutComponent,
        data: { permission: Permissions.EVENTS_PAGE, headerTitle: 'Events', createButtonAction: 'events' },
        loadChildren: () => import('./events/events.routes').then((m) => m.EVENTS_ROUTES),
      },
      {
        path: 'file-explorer',
        component: FileExplorerLayoutComponent,
        data: { permission: Permissions.FILE_EXPLORER_PAGE, headerTitle: 'File Explorer', createButtonAction: 'file-explorer' },
        loadChildren: () => import('./file-explorer/file-explorer.routes').then((m) => m.FILE_EXPLORER_ROUTES),
      },
      {
        path: 'money',
        component: MoneyLayoutComponent,
        data: { permission: Permissions.MONEY_APP_PAGE, headerTitle: 'Money' },
        loadChildren: () => import('./money/money.routes').then((m) => m.MONEY_ROUTES),
      },
      {
        path: 'logging',
        component: LoggingLayoutComponent,
        data: { permission: Permissions.LOGGING_PAGE, headerTitle: 'Logging' },
        loadChildren: () => import('./logging/logging.routes').then((m) => m.LOGGING_ROUTES),
      },
    ],
  },
];
