export interface TaskPoint {
  id: number;
  name: string;
  points: number;
}

export function createTaskPoint(params: Partial<TaskPoint>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    points: params.points ?? 0,
  } as TaskPoint;
}
