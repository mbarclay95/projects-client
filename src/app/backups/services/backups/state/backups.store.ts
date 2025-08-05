import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Backup } from '../../../models/backup.model';

export interface BackupsState extends EntityState<Backup> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'backups' })
export class BackupsStore extends EntityStore<BackupsState> {
  constructor() {
    super();
  }
}
