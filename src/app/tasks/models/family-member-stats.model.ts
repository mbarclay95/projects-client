export interface FamilyMemberStats {
  name: string;
  totalTasks: number;
  totalEarnedPoints: number;
  totalExpectedPoints: number;
  topTasks: TopTask[];
}

export interface TopTask {
  taskName: string;
  count: number;
}

export function createFamilyMemberStats(params: Partial<FamilyMemberStats>) {
  return {
    name: params.name ?? '',
    totalTasks: params.totalTasks ?? 0,
    totalEarnedPoints: params.totalEarnedPoints ?? 0,
    totalExpectedPoints: params.totalExpectedPoints ?? 0,
    topTasks: (params.topTasks ?? []).map((t) => createTopTask(t)),
  } as FamilyMemberStats;
}

function createTopTask(params: Partial<TopTask>): TopTask {
  return {
    taskName: params.taskName ?? '',
    count: params.count ?? 0,
  } as TopTask;
}
