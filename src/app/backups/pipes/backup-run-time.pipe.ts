import {Pipe, PipeTransform} from '@angular/core';
import {Backup} from "../models/backup.model";
import {formatDistanceStrict} from "date-fns";
import {BackupStep} from "../models/backup-step.model";

@Pipe({
  name: 'backupRunTime'
})
export class BackupRunTimePipe implements PipeTransform {

  transform(backup: Backup | BackupStep, ...args: unknown[]): string {
    //   return timer(0, 1000).pipe(
    //     takeWhile(() => !backup.completedAt && !backup.erroredAt, true),
    //     map(() => {
    //       console.log(`${backup.id} here`);
    //       if (!backup.startedAt) {
    //         return '';
    //       }
    //       if (backup.completedAt) {
    //         return formatDistanceStrict(backup.completedAt, backup.startedAt);
    //       }
    //       if (backup.erroredAt) {
    //         return formatDistanceStrict(backup.erroredAt, backup.startedAt);
    //       }
    //
    //       return formatDistanceStrict(new Date(), backup.startedAt);
    //     })
    //   );
    console.log(`${backup.id} here`);
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
