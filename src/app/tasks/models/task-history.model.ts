export interface TaskHistory {
  id: number;
  completedByName: string;
  completedAt: Date;
}

export function createTaskHistory(params: Partial<TaskHistory>) {
  return {
    id: params.id ?? 0,
    completedByName: params.completedByName ?? '',
    completedAt: params.completedAt ? new Date(params.completedAt) : null,
  } as TaskHistory;
}
