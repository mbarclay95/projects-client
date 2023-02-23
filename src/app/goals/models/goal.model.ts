import {NzSelectOptionInterface} from "ng-zorro-antd/select";
import {createGoalDay, GoalDay} from './goal-day.model';

export interface Goal {
  id: number;
  createdAt: Date;
  expectedAmount: number;
  currentAmount: number;
  title: string;
  unit: string;
  lengthOfTime: LengthOfTime;
  equality: Equality;
  verb: string;
  goalDays: GoalDay[];
  singularUnit?: string;
  pluralUnit?: string;
}

export function createGoal(params: Partial<Goal>) {
  return {
    id: params.id ?? 0,
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    title: params.title ?? '',
    expectedAmount: params.expectedAmount ?? '',
    currentAmount: params.currentAmount ?? 0,
    unit: params.unit ?? '',
    lengthOfTime: params.lengthOfTime ?? '',
    equality: params.equality ?? '',
    verb: params.verb ?? '',
    singularUnit: params.singularUnit ?? undefined,
    pluralUnit: params.pluralUnit ?? undefined,
    goalDays: params.goalDays ? params.goalDays.map(g => createGoalDay(g)) : []
  } as Goal;
}

export type Equality = 'atMost' | 'atLeast';

export const EqualityDropDown: NzSelectOptionInterface[] = [
  {label: 'at most', value: 'atMost'},
  {label: 'at least', value: 'atLeast'},
];

export type LengthOfTime = 'week' | 'month';

export const LengthOfTimeDropDown: NzSelectOptionInterface[] = [
  // {label: 'day', value: 'day'},
  {label: 'week', value: 'week'},
  {label: 'month', value: 'month'},
  // {label: 'year', value: 'year'},
];

export const daysOfWeek: string[] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];
