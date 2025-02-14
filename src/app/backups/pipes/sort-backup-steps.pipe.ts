import { Pipe, PipeTransform } from '@angular/core';
import {BackupStep} from '../models/backup-step.model';

@Pipe({
  name: 'sortBackupSteps',
  standalone: true
})
export class SortBackupStepsPipe implements PipeTransform {

  transform(backupSteps: BackupStep[]): BackupStep[] {
    return backupSteps.sort((a, b) => a.sort - b.sort);
  }

}
