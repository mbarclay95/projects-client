import { Pipe, PipeTransform } from '@angular/core';
import {Backup, BackupStatus} from "../models/backup.model";
import {BackupStep} from "../models/backup-step.model";

@Pipe({
  name: 'backupStatus'
})
export class BackupStatusPipe implements PipeTransform {

  transform(backup: Backup|BackupStep, ...args: unknown[]): BackupStatus {
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
