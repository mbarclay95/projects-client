import { createRole, Role } from './role.model';
import { createUserConfig, UserConfig } from './user-config.model';
import { Roles } from '../../auth/permissions';

export interface User {
  id: number;
  name: string;
  username?: string;
  password?: string;
  createdAt: Date;
  lastLoggedInAt: Date;
  roles: Role[];
  clientPermissions: string[];
  userConfig: UserConfig;
  familyId: number | null;
}

export function createUser(params: Partial<User>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    lastLoggedInAt: params.lastLoggedInAt ? new Date(params.lastLoggedInAt) : new Date(),
    roles: params.roles?.map((role) => createRole(role)) ?? [],
    clientPermissions: params.clientPermissions ?? [],
    userConfig: createUserConfig(params.userConfig ?? {}),
    familyId: params.familyId ?? null,
  } as User;
}

export function createNewUserWithDefaultRole(roles: Role[]): Partial<User> {
  const dashboardRole = roles.find((r) => r.name === Roles.DASHBOARD_ROLE);
  return { id: 0, roles: dashboardRole ? [dashboardRole] : [] };
}
