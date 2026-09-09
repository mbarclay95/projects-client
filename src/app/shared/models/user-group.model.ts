import { getYear } from 'date-fns';

export interface UserGroup {
  id: number;
  name: string;
  members: { id: number; name: string }[];
  tasksPerWeek: number;
  totalFamilyTasks: number;
  taskPoints: number[];
  taskStrategy: TaskStrategy;
  minWeekOffset: number;
  minYear: number;
  scope: UserGroupScope;
}

export type TaskStrategy = 'per task' | 'per task point';

export type UserGroupScope = 'tasks' | 'grocery';

export const USER_GROUP_SCOPES: UserGroupScope[] = ['tasks', 'grocery'];
export const USER_GROUP_SCOPE_LABELS: Record<UserGroupScope, string> = {
  tasks: 'Family',
  grocery: 'Grocery Group',
};

export function createUserGroup(params: Partial<UserGroup>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    members: params.members ?? [],
    tasksPerWeek: params.tasksPerWeek ?? 0,
    totalFamilyTasks: params.totalFamilyTasks ?? 0,
    taskPoints: params.taskPoints ?? [],
    taskStrategy: params.taskStrategy ?? 'per task',
    minWeekOffset: params.minWeekOffset ?? 0,
    minYear: params.minYear ?? getYear(new Date()),
    scope: params.scope ?? 'tasks',
  } as UserGroup;
}
