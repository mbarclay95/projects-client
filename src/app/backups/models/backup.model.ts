import {BackupStep, createBackupStep} from "./backup-step.model";

export interface Backup {
  id: number;
  name: string;
  startedAt?: Date;
  completedAt?: Date;
  erroredAt?: Date;
  scheduledBackupId?: number;
  backupSteps: BackupStep[];
}

export function createBackup(params: Partial<Backup>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    startedAt: params.startedAt ? new Date(params.startedAt) : undefined,
    completedAt: params.completedAt ? new Date(params.completedAt) : undefined,
    erroredAt: params.erroredAt ? new Date(params.erroredAt) : undefined,
    scheduledBackupId: params.scheduledBackupId,
    backupSteps: params.backupSteps?.map(backupStep => createBackupStep(backupStep)) ?? [],
  } as Backup;
}

export type BackupStatus = 'queued' | 'inProgress' | 'completed' | 'errored';
