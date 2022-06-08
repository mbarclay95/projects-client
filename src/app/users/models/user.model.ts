import {createRole, Role} from "./role.model";
import {createUserConfig, UserConfig} from "./user-config.model";

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
  taskUserConfig?: TaskUserConfig;
}

export function createUser(params: Partial<User>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    lastLoggedInAt: params.lastLoggedInAt ? new Date(params.lastLoggedInAt) : new Date(),
    roles: params.roles?.map(role => createRole(role)) ?? [],
    clientPermissions: params.clientPermissions ?? [],
    userConfig: createUserConfig(params.userConfig ?? {}),
    taskUserConfig: params.taskUserConfig,
  } as User;
}

export interface TaskUserConfig {
  id: number;
  tasksPerWeek: number;
  tasksCompleted: number;
  familyId: number;
  color: string;
}
