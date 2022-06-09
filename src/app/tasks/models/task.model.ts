export interface Task {
  id: number;
  name: string;
  completedAt?: Date;
  clearedAt?: Date;
  dueDate?: Date;
  description?: string;
  ownerType: 'family' | 'user';
  ownerId: number;
  recurring: boolean;
  frequencyAmount?: number;
  frequencyUnit?: 'day' | 'week' | 'month';
}

export function createTask(params: Partial<Task>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    completedAt: params.completedAt ? new Date(params.completedAt) : null,
    clearedAt: params.clearedAt ? new Date(params.clearedAt) : null,
    dueDate: params.dueDate ? new Date(params.dueDate) : null,
    description: params.description ?? null,
    ownerType: params.ownerType ?? 'user',
    ownerId: params.ownerId ?? 0,
    recurring: params.recurring ?? false,
    frequencyAmount: params.frequencyAmount,
    frequencyUnit: params.frequencyUnit,
  } as Task;
}
