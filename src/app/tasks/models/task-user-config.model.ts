import {createTask, Task} from './task.model';

export interface TaskUserConfig {
  id: number;
  userId: number;
  userName: string;
  tasksPerWeek: number;
  completedFamilyTasks: Task[];
  familyId: number;
  color: string;
}

export function createTaskUserConfig(params: Partial<TaskUserConfig>) {
  return {
    id: params.id ?? 0,
    userId: params.userId ?? 0,
    userName: params.userName ?? '',
    tasksPerWeek: params.tasksPerWeek ?? 0,
    familyId: params.familyId ?? 0,
    color: params.color ?? '',
    completedFamilyTasks: params.completedFamilyTasks ? params.completedFamilyTasks.map(t => createTask(t)) : [],
  } as TaskUserConfig;
}

