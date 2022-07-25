import {Roles} from "../../auth/permissions";

export interface UserConfig {
  sideMenuOpen: boolean;
  homePageRole: Roles;
}

export function createUserConfig(params: Partial<UserConfig>) {
  return {
    sideMenuOpen: params.sideMenuOpen ?? true,
    homePageRole: params.homePageRole ?? Roles.DASHBOARD_ROLE,
  } as UserConfig;
}
