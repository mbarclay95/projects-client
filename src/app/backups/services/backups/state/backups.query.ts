import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BackupsStore, BackupsState } from './backups.store';
import {Observable} from "rxjs";
import {Backup} from "../../../models/backup.model";

@Injectable({ providedIn: 'root' })
export class BackupsQuery extends QueryEntity<BackupsState> {
  backups$: Observable<Backup[]> = this.selectAll();

  constructor(
    protected override store: BackupsStore
  ) {
    super(store);
  }

}
