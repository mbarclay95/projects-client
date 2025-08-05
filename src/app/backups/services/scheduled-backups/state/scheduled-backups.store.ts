import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Schedule } from '../../../models/scheduled.model';

export interface ScheduledBackupsState extends EntityState<Schedule> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'scheduled-backups' })
export class ScheduledBackupsStore extends EntityStore<ScheduledBackupsState> {
  constructor() {
    super();
  }
}
