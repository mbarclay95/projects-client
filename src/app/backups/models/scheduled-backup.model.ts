import {createScheduledBackupStep, ScheduledBackupStep} from "./scheduled-backup-step.model";

export interface ScheduledBackup {
  id: number;
  name: string;
  schedule: WeeklySchedule|MonthlySchedule;
  startTime: number;
  fullEveryNDays: number;
  enabled: boolean;
  scheduledBackupSteps: ScheduledBackupStep[];
}

export function createScheduledBackup(params: Partial<ScheduledBackup>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    schedule: params.schedule ? params.schedule : {...defaultSchedule},
    startTime: params.startTime ?? 0,
    fullEveryNDays: params.fullEveryNDays ?? 0,
    enabled: !!params.enabled,
    scheduledBackupSteps: params.scheduledBackupSteps?.map(step => createScheduledBackupStep(step)) ?? [],
  } as ScheduledBackup;
}

const defaultSchedule: WeeklySchedule = {
  mode: 'weekly',
  dayOfWeek: []
};

export interface WeeklySchedule {
  mode: 'weekly',
  dayOfWeek: DayOfWeek[],
}

export interface MonthlySchedule {
  mode: 'monthly',
  dayOfMonth: number[]
}

export type DayOfWeek = 'mon'|'tue'|'wed'|'thur'|'fri'|'sat'|'sun';

export const daysOfWeek: DayOfWeek[] = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

export const daysOfMonth: number[] = [...Array(30).keys()].map(num => num + 1);
