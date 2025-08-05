import { BackupStep, createBackupStep } from './backup-step.model';

export interface BackupStepJob {
  id: number;
  startedAt?: Date;
  completedAt?: Date;
  erroredAt?: Date;
  errorMessage?: string;
  backupStep: BackupStep;
  sort: number;
}

export function createBackupStepJob(params: Partial<BackupStepJob>) {
  return {
    id: params.id ?? 0,
    sort: params.sort,
    startedAt: params.startedAt ? new Date(params.startedAt) : undefined,
    completedAt: params.completedAt ? new Date(params.completedAt) : undefined,
    erroredAt: params.erroredAt ? new Date(params.erroredAt) : undefined,
    errorMessage: params.errorMessage ?? undefined,
    backupStep: createBackupStep(params.backupStep ?? {}),
  } as BackupStepJob;
}
