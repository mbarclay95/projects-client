import {BackupStepJob, createBackupStepJob} from './backup-step-job.model';

export interface BackupJob {
  id: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  erroredAt?: Date;
  errorMessage?: string;
  backupStepJobs: BackupStepJob[]
}

export function createBackupJob(params: Partial<BackupJob>) {
  return {
    id: params.id ?? 0,
    createdAt: params.createdAt ? new Date(params.createdAt) : undefined,
    startedAt: params.startedAt ? new Date(params.startedAt) : undefined,
    completedAt: params.completedAt ? new Date(params.completedAt) : undefined,
    erroredAt: params.erroredAt ? new Date(params.erroredAt) : undefined,
    errorMessage: params.errorMessage,
    backupStepJobs: params.backupStepJobs?.map(stepJob => createBackupStepJob(stepJob)) ?? []
  } as BackupJob;
}
