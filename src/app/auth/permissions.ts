import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

export const enum Permissions {
  USERS_PAGE = 'client_view_users_page',
  DASHBOARD_PAGE = 'client_view_dashboard_page',
  GOALS_PAGE = 'client_view_goals_page',
  BACKUPS_PAGE = 'client_view_backups_page',
  TASKS_PAGE = 'client_view_tasks_page',
  FAMILIES_TAB = 'client_view_families_tab',
}

export interface Route {
  icon: IconDefinition,
  url: string,
  permission: Permissions,
  title: string
  queryParams: Record<string, string>
}
