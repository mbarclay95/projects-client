import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduledBackupsStore } from './scheduled-backups.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {createSchedule, Schedule} from '../../../models/scheduled.model';

@Injectable({ providedIn: 'root' })
export class ScheduledBackupsService {

  constructor(
    private scheduledBackupsStore: ScheduledBackupsStore,
    private http: HttpClient
  ) {
  }

  async getScheduledBackups(): Promise<void> {
    await firstValueFrom(this.http.get<Schedule[]>(`${environment.apiUrl}/scheduled-backups`).pipe(
      map(scheduledBackups => scheduledBackups.map(scheduledBackup => createSchedule(scheduledBackup))),
      tap(scheduledBackups => this.scheduledBackupsStore.set(scheduledBackups))
    ));
  }


  async createNewBackups(backup: any) {

  }
}
