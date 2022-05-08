import {createTarget, Target} from "./target.model";

export interface BackupStep {
  id: number;
  name: string;
  startedAt?: Date;
  completedAt?: Date;
  erroredAt?: Date;
  fullBackup: boolean;
  sourceDir: string;
  sort: number;
  target: Target
}

export function createBackupStep(params: Partial<BackupStep>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    startedAt: params.startedAt ? new Date(params.startedAt) : undefined,
    completedAt: params.completedAt ? new Date(params.completedAt) : undefined,
    erroredAt: params.erroredAt ? new Date(params.erroredAt) : undefined,
    fullBackup: params.fullBackup ?? false,
    sourceDir: params.sourceDir ?? '',
    sort: params.sort ?? 0,
    target: createTarget(params.target ?? {})
  } as BackupStep;
}
