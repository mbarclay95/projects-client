import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackupsStore } from './backups.store';
import {firstValueFrom, Observable} from "rxjs";
import {Backup, createBackup} from "../../../models/backup.model";
import {environment} from "../../../../../environments/environment";
import {map, tap} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class BackupsService {

  constructor(
    private backupsStore: BackupsStore,
    private http: HttpClient
  ) {
  }

  async getBackups(): Promise<void> {
    await firstValueFrom(this.getBackups$());
  }

  getBackups$(): Observable<Backup[]> {
    return this.http.get<Backup[]>(`${environment.apiUrl}/backups`).pipe(
      map(backups => backups.map(backup => createBackup(backup))),
      tap(backups => this.backupsStore.set(backups))
    );
  }

  async createNewBackups(newBackup: Backup): Promise<void> {
    await firstValueFrom(this.http.post<Backup>(`${environment.apiUrl}/backups`, newBackup).pipe(
      map(backup => createBackup(backup)),
      tap(backup => this.backupsStore.add(backup))
    ));
  }


}
