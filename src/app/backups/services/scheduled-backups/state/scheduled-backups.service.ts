import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduledBackupsStore } from './scheduled-backups.store';
import {firstValueFrom} from "rxjs";
import {createScheduledBackup, ScheduledBackup} from "../../../models/scheduled-backup.model";
import {environment} from "../../../../../environments/environment";
import {map, tap} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ScheduledBackupsService {

  constructor(
    private scheduledBackupsStore: ScheduledBackupsStore,
    private http: HttpClient
  ) {
  }

  async getScheduledBackups(): Promise<void> {
    await firstValueFrom(this.http.get<ScheduledBackup[]>(`${environment.apiUrl}/scheduled-backups`).pipe(
      map(scheduledBackups => scheduledBackups.map(scheduledBackup => createScheduledBackup(scheduledBackup))),
      tap(scheduledBackups => this.scheduledBackupsStore.set(scheduledBackups))
    ));
  }


  async createNewBackups(backup: any) {

  }
}
