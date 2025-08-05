export interface Schedule {
  id: number;
  name: string;
  schedule: WeeklySchedule | MonthlySchedule;
  startTime: number;
  fullEveryNDays: number;
  enabled: boolean;
}

export function createSchedule(params: Partial<Schedule>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    schedule: params.schedule ? params.schedule : { ...defaultSchedule },
    startTime: params.startTime ?? 0,
    fullEveryNDays: params.fullEveryNDays ?? 0,
    enabled: !!params.enabled,
  } as Schedule;
}

const defaultSchedule: WeeklySchedule = {
  mode: 'weekly',
  dayOfWeek: [],
};

export interface WeeklySchedule {
  mode: 'weekly';
  dayOfWeek: DayOfWeek[];
}

export interface MonthlySchedule {
  mode: 'monthly';
  dayOfMonth: number[];
}

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thur' | 'fri' | 'sat' | 'sun';

export const daysOfWeek: DayOfWeek[] = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

export const daysOfMonth: number[] = [...Array(30).keys()].map((num) => num + 1);
