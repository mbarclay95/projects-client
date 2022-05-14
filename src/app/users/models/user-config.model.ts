
export interface UserConfig {
  sideMenuOpen: boolean
}

export function createUserConfig(params: Partial<UserConfig>) {
  return {
    sideMenuOpen: params.sideMenuOpen ?? true,
  } as UserConfig;
}
