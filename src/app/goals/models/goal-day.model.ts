export interface GoalDay {
  id: number;
  date: Date;
  amount: number | null;
}

export function createGoalDay(params: Partial<GoalDay>) {
  return {
    id: params.id ?? 0,
    date: params.date ? new Date(params.date) : new Date(),
    amount: params.amount ?? null,
  } as GoalDay;
}

export interface GoalDayButton {
  goalDay: GoalDay;
  dayString: string;
  isToday: boolean;
}
