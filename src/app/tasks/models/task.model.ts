export interface Task {
  id: number;
  name: string;
  completedAt?: Date;
  clearedAt?: Date;
  dueDate?: Date;
  description?: string;
  recurringTaskId?: number;
  ownerType: 'family' | 'user';
  ownerId: number;
  recurring?: boolean;
  frequencyAmount?: number;
  frequencyType?: 'day' | 'week' | 'month';
}

export function createTask(params: Partial<Task>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    completedAt: params.completedAt ? new Date(params.completedAt) : undefined,
    clearedAt: params.clearedAt ? new Date(params.clearedAt) : undefined,
    dueDate: params.dueDate ? new Date(params.dueDate) : undefined,
    description: params.description ?? undefined,
    recurringTaskId: params.recurringTaskId ?? undefined,
    ownerType: params.ownerType ?? '',
    ownerId: params.ownerId ?? 0,
    recurring: params.recurring,
    frequencyAmount: params.frequencyAmount,
    frequencyType: params.frequencyType,
  } as Task;
}
