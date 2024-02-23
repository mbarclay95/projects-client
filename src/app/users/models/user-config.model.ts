import {Roles} from "../../auth/permissions";

export interface UserConfig {
  sideMenuOpen: boolean;
  homePageRole: Roles | null;
  moneyAppToken: string | null;
}

export function createUserConfig(params: Partial<UserConfig>) {
  return {
    sideMenuOpen: params.sideMenuOpen ?? true,
    homePageRole: params.homePageRole ?? null,
    moneyAppToken: params.moneyAppToken ?? null,
  } as UserConfig;
}
