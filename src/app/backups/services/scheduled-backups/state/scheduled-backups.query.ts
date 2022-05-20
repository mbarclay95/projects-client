import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ScheduledBackupsStore, ScheduledBackupsState } from './scheduled-backups.store';
import {Observable} from "rxjs";
import {ScheduledBackup} from "../../../models/scheduled-backup.model";

@Injectable({ providedIn: 'root' })
export class ScheduledBackupsQuery extends QueryEntity<ScheduledBackupsState> {
  scheduledBackups$: Observable<ScheduledBackup[]> = this.selectAll();

  constructor(
    protected override store: ScheduledBackupsStore
  ) {
    super(store);
  }

}
