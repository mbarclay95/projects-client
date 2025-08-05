import { Pipe, PipeTransform } from '@angular/core';
import { BackupStatus } from '../models/backup.model';
import { BackupJob } from '../models/backup-job.model';
import { BackupStepJob } from '../models/backup-step-job.model';

@Pipe({
  name: 'backupStatus',
})
export class BackupStatusPipe implements PipeTransform {
  transform(backup: BackupJob | BackupStepJob): BackupStatus {
    if (backup.erroredAt) {
      return 'errored';
    }
    if (backup.completedAt) {
      return 'completed';
    }
    if (backup.startedAt) {
      return 'inProgress';
    }

    return 'queued';
  }
}
