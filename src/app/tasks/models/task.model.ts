
export interface Task {
  id: number;
  name: string;
  completedAt?: Date;
  clearedAt?: Date;
  dueDate?: Date;
  description?: string;
  ownerType: TaskOwnerType;
  ownerId: number;
  recurring: boolean;
  frequencyAmount?: number;
  frequencyUnit?: 'day' | 'week' | 'month';
  tags: string[];
  taskPoint?: number;
  isActive: boolean;
  priority: number;
}

export type TaskOwnerType = 'family' | 'user';

export function createTask(params: Partial<Task>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    completedAt: params.completedAt ? new Date(params.completedAt) : null,
    clearedAt: params.clearedAt ? new Date(params.clearedAt) : null,
    dueDate: params.dueDate ? new Date(params.dueDate) : null,
    description: params.description ?? null,
    ownerType: params.ownerType ?? 'family',
    ownerId: params.ownerId ?? 0,
    recurring: params.recurring ?? false,
    frequencyAmount: params.frequencyAmount,
    frequencyUnit: params.frequencyUnit,
    tags: params.tags ? params.tags : [],
    taskPoint: params.taskPoint ?? undefined,
    isActive: params.isActive ?? true,
    priority: Number(params.priority ?? 0),
  } as Task;
}
