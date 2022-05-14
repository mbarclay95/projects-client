import { Pipe, PipeTransform } from '@angular/core';
import {Backup} from "../models/backup.model";
import {formatDistanceStrict} from "date-fns";

@Pipe({
  name: 'backupRunTime'
})
export class BackupRunTimePipe implements PipeTransform {

  transform(backup: Backup, ...args: unknown[]): string {
    if (!backup.startedAt) {
      return '';
    }
    if (backup.completedAt) {
      return formatDistanceStrict(backup.completedAt, backup.startedAt);
    }

    return '';
  }

}
