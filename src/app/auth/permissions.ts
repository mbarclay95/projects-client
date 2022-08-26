import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

export const enum Permissions {
  USERS_PAGE = 'client_view_users_page',
  DASHBOARD_PAGE = 'client_view_dashboard_page',
  GOALS_PAGE = 'client_view_goals_page',
  BACKUPS_PAGE = 'client_view_backups_page',
  TASKS_PAGE = 'client_view_tasks_page',
  FAMILIES_TAB = 'client_view_families_tab',
  EVENTS_PAGE = 'client_view_events_page',
}

export const enum Roles {
  USERS_ROLE = 'users_role',
  GOALS_ROLE = 'goals_role',
  BACKUPS_ROLE = 'backups_role',
  DASHBOARD_ROLE = 'dashboard_role',
  TASKS_ROLE = 'task_role',
  EVENTS_ROLE = 'event_role',
}

export interface Route {
  icon: IconDefinition,
  url: string,
  permission: Permissions | true,
  title: string
  queryParams: Record<string, string>
}
