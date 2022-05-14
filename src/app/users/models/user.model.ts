import {createRole, Role} from "./role.model";
import {createUserConfig, UserConfig} from "./user-config.model";

export interface User {
  id: number;
  name: string;
  createdAt: Date;
  lastLoggedInAt: Date;
  roles: Role[];
  permissions: string[];
  userConfig: UserConfig;
}

export function createUser(params: Partial<User>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    lastLoggedInAt: params.lastLoggedInAt ? new Date(params.lastLoggedInAt) : new Date(),
    roles: params.roles?.map(role => createRole(role)) ?? [],
    permissions: params.permissions ?? [],
    userConfig: createUserConfig(params.userConfig ?? {}),
  } as User;
}
