import {createTarget, Target} from "./target.model";

export interface ScheduledBackupStep {
  id: number;
  name: string;
  sourceDir: string;
  sort: number;
  target: Target
}

export function createScheduledBackupStep(params: Partial<ScheduledBackupStep>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    sourceDir: params.sourceDir ?? '',
    sort: params.sort ?? 0,
    target: createTarget(params.target ?? {})
  } as ScheduledBackupStep;
}
