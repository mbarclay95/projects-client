import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ScheduledBackupsStore, ScheduledBackupsState } from './scheduled-backups.store';
import { Observable } from 'rxjs';
import { Schedule } from '../../../models/scheduled.model';

@Injectable({ providedIn: 'root' })
export class ScheduledBackupsQuery extends QueryEntity<ScheduledBackupsState> {
  scheduledBackups$: Observable<Schedule[]> = this.selectAll();

  constructor(protected override store: ScheduledBackupsStore) {
    super(store);
  }
}
