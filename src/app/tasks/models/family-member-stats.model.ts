
export interface FamilyMemberStats {
  name: string,
  totalTasks: number,
  totalPoints: number,
  topTasks: TopTask[]
}

export interface TopTask {
  taskName: string,
  count: number
}

export function createFamilyMemberStats(params: Partial<FamilyMemberStats>) {
  return {
    name: params.name ?? '',
    totalTasks: params.totalTasks ?? 0,
    totalPoints: params.totalPoints ?? 0,
    topTasks: (params.topTasks ?? []).map((t) => createTopTask(t)),
  } as FamilyMemberStats;
}

function createTopTask(params: Partial<TopTask>): TopTask {
  return {
    taskName: params.taskName ?? '',
    count: params.count ?? 0
  } as TopTask;
}
