import { getYear } from 'date-fns';

export interface Family {
  id: number;
  name: string;
  members: { id: number; name: string }[];
  tasksPerWeek: number;
  totalFamilyTasks: number;
  taskPoints: number[];
  taskStrategy: TaskStrategy;
  minWeekOffset: number;
  minYear: number;
}

export type TaskStrategy = 'per task' | 'per task point';

export function createFamily(params: Partial<Family>) {
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
  } as Family;
}
