import {Pipe, PipeTransform} from '@angular/core';
import {formatDistanceStrict} from "date-fns";
import {BackupJob} from '../models/backup-job.model';
import {BackupStepJob} from '../models/backup-step-job.model';

@Pipe({
  name: 'backupRunTime'
})
export class BackupRunTimePipe implements PipeTransform {

  transform(backup: BackupJob | BackupStepJob): string {
    if (!backup.startedAt) {
      return '';
    }
    if (backup.completedAt) {
      return formatDistanceStrict(backup.completedAt, backup.startedAt);
    }
    if (backup.erroredAt) {
      return formatDistanceStrict(backup.erroredAt, backup.startedAt);
    }

    return formatDistanceStrict(new Date(), backup.startedAt);
  }
}
