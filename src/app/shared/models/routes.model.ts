import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { Permissions } from '../../auth/permissions';
import {
  faBullseye,
  faCalendarDays,
  faChessKnight,
  faDatabase,
  faFolderOpen,
  faGear,
  faHome,
  faMoneyCheckDollar,
  faTasks,
  faUpload,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { isMobile } from '../../app.component';

export interface Route {
  icon: IconDefinition;
  url: string;
  permission: Permissions | true;
  title: AppTitle;
  queryParams: Record<string, string>;
}

export type AppTitle =
  | 'Dashboard'
  | 'Backups'
  | 'Tasks'
  | 'File Explorer'
  | 'Games Admin'
  | 'Money'
  | 'Events'
  | 'Logging'
  | 'Users'
  | 'My Profile'
  | 'Goals';

export const routes: Route[] = [
  {
    icon: faHome,
    url: 'app/dashboard',
    permission: Permissions.DASHBOARD_PAGE,
    title: 'Dashboard',
    queryParams: {},
  },
  { icon: faBullseye, url: 'app/goals', permission: Permissions.GOALS_PAGE, title: 'Goals', queryParams: {} },
  {
    icon: faUpload,
    url: 'app/backups',
    permission: Permissions.BACKUPS_PAGE,
    title: 'Backups',
    queryParams: { tab: 'backups' },
  },
  {
    icon: faTasks,
    url: `app/tasks${isMobile ? '/weekly-tasks' : ''}`,
    permission: Permissions.TASKS_PAGE,
    title: 'Tasks',
    queryParams: isMobile ? {} : { tab: 'weekly-tasks' },
  },
  {
    icon: faFolderOpen,
    url: 'app/file-explorer',
    permission: Permissions.FILE_EXPLORER_PAGE,
    title: 'File Explorer',
    queryParams: {},
  },
  {
    icon: faChessKnight,
    url: 'games/admin',
    permission: Permissions.GAMING_SESSIONS_ADMIN_PAGE,
    title: 'Games Admin',
    queryParams: {},
  },
  {
    icon: faMoneyCheckDollar,
    url: 'app/money',
    permission: Permissions.MONEY_APP_PAGE,
    title: 'Money',
    queryParams: {},
  },
  { icon: faCalendarDays, url: 'app/events', permission: Permissions.EVENTS_PAGE, title: 'Events', queryParams: {} },
  { icon: faDatabase, url: 'app/logging', permission: Permissions.LOGGING_PAGE, title: 'Logging', queryParams: {} },
  { icon: faUsers, url: 'app/users', permission: Permissions.USERS_PAGE, title: 'Users', queryParams: {} },
  { icon: faGear, url: 'my-profile', permission: true, title: 'My Profile', queryParams: {} },
];
