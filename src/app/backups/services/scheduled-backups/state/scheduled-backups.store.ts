import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ScheduledBackup } from '../../../models/scheduled-backup.model';

export interface ScheduledBackupsState extends EntityState<ScheduledBackup> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'scheduled-backups' })
export class ScheduledBackupsStore extends EntityStore<ScheduledBackupsState> {

  constructor() {
    super();
  }

}
