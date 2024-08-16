export interface BackupStep {
  id: number;
  name: string;
  startedAt?: Date;
  completedAt?: Date;
  erroredAt?: Date;
  sort: number;
  backupStepType: 'tar_zip' | 's3_upload';
  config: {}
}

interface TarZipBackupStepType extends BackupStep {
  backupStepType: 'tar_zip';
  config: {
    sourceTargetId: number;
    destinationTargetId: number;
    fileName: string;
  }
}

interface S3UploadBackupStepType extends BackupStep {
  backupStepType: 's3_upload';
  config: {
    sourceTargetId: number;
    destinationTargetId: number;
    fileName: string;
    s3Driver: 'minio-s3' | 'aws-s3';
  }
}

export function isTarZip(backupStep: BackupStep): backupStep is TarZipBackupStepType {
  return backupStep.backupStepType === 'tar_zip';
}

export function isS3Upload(backupStep: BackupStep): backupStep is S3UploadBackupStepType {
  return backupStep.backupStepType === 's3_upload';
}

export function createBackupStep(params: Partial<BackupStep>): BackupStep {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    startedAt: params.startedAt ? new Date(params.startedAt) : undefined,
    completedAt: params.completedAt ? new Date(params.completedAt) : undefined,
    erroredAt: params.erroredAt ? new Date(params.erroredAt) : undefined,
    sort: params.sort ?? 0,
    backupStepType: params.backupStepType ?? null,
    config: params.config ?? {}
  } as BackupStep;
}
