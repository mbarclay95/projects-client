import { BackupStep, createBackupStep } from './backup-step.model';
import { BackupJob, createBackupJob } from './backup-job.model';
import { createSchedule, Schedule } from './scheduled.model';

export interface Backup {
  id: number;
  name: string;
  backupSteps: BackupStep[];
  backupJobs: BackupJob[];
  schedules: Schedule[];
}

export function createBackup(params: Partial<Backup>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    backupSteps: params.backupSteps?.map((backupStep) => createBackupStep(backupStep)) ?? [],
    backupJobs: (params.backupJobs?.map((job) => createBackupJob(job)) ?? []).sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }),
    schedules: params.schedules?.map((schedule) => createSchedule(schedule)) ?? [],
  } as Backup;
}

export type BackupStatus = 'queued' | 'inProgress' | 'completed' | 'errored';
