export interface BackupStepJob {
  id: number;
  startedAt?: Date;
  completedAt?: Date;
  erroredAt?: Date;
  backupStepId: number;
}

export function createBackupStepJob(params: Partial<BackupStepJob>) {
  return {
    id: params.id ?? 0,
    startedAt: params.startedAt ? new Date(params.startedAt) : undefined,
    completedAt: params.completedAt ? new Date(params.completedAt) : undefined,
    erroredAt: params.erroredAt ? new Date(params.erroredAt) : undefined,
    backupStepId: params.backupStepId,
  } as BackupStepJob;
}
