import {createRole, Role} from "./role.model";
import {createUserConfig, UserConfig} from "./user-config.model";
import {createTask} from "../../tasks/models/task.model";
import {Task} from "../../tasks/models/task.model";

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
    taskUserConfig: params.taskUserConfig ? createTaskUserConfig(params.taskUserConfig) : undefined,
  } as User;
}

export interface TaskUserConfig {
  id: number;
  tasksPerWeek: number;
  totalUserTasks: number;
  completedFamilyTasks: Task[];
  familyId: number;
  color: string;
}

export function createTaskUserConfig(params: Partial<TaskUserConfig>) {
  return {
    id: params.id ?? 0,
    tasksPerWeek: params.tasksPerWeek ?? 0,
    totalUserTasks: params.totalUserTasks ?? 0,
    familyId: params.familyId ?? 0,
    color: params.color ?? '',
    completedFamilyTasks: params.completedFamilyTasks ? params.completedFamilyTasks.map(t => createTask(t)) : [],
  } as TaskUserConfig;
}
