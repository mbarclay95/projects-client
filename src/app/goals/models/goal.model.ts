import {NzSelectOptionInterface} from "ng-zorro-antd/select";

export interface Goal {
  id: number;
  createdAt: Date;
  expectedAmount: number;
  title: string;
  unit: string;
  lengthOfTime: lengthOfTime;
  equality: equality;
  verb: string;
}

export function createGoal(params: Partial<Goal>) {
  return {
    id: params.id ?? 0,
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    title: params.title ?? '',
    expectedAmount: params.expectedAmount ? Number(params.expectedAmount) : '',
    unit: params.unit ?? '',
    lengthOfTime: params.lengthOfTime ?? '',
    equality: params.equality ?? '',
    verb: params.verb ?? '',
  } as Goal;
}

export type equality = 'lessThan' | 'greaterThan' | 'equal';

export const EqualityDropDown: NzSelectOptionInterface[] = [
  {label: 'less than', value: 'lessThan'},
  {label: 'greater than', value: 'greaterThan'},
  {label: 'exactly', value: 'equal'},
];

export type lengthOfTime = 'day' | 'week' | 'month' | 'year';

export const LengthOfTimeDropDown: NzSelectOptionInterface[] = [
  {label: 'day', value: 'day'},
  {label: 'week', value: 'week'},
  {label: 'month', value: 'month'},
  {label: 'year', value: 'year'},
];
