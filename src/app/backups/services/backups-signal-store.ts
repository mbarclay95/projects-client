import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { Backup, createBackup } from '../models/backup.model';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { setEntities } from '@ngrx/signals/entities';

export const BackupsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Backup>({
    pluralEntityName: 'backups',
    createEntity: createBackup,
  }),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const stopPolling$ = new Subject<void>();

    const runBackup = rxMethod<{ backupId: number }>(
      pipe(
        switchMap(({ backupId }) => httpClient.post(`${environment.apiUrl}/run-backup/${backupId}`, {})),
        tap(() => {
          store.loadAll({});
          startPolling();
        }),
      ),
    );

    const startPolling = rxMethod<void>(
      pipe(
        tap(() => stopPolling$.next()),
        switchMap(() =>
          timer(0, 1000).pipe(
            tap(() => {
              const backups = store.entities();
              if (backups.some((backup) => backup.backupJobs.some((backupJob) => !backupJob.completedAt && !backupJob.erroredAt))) {
                return;
              }

              stopPolling$.next();
            }),
            exhaustMap(() =>
              httpClient.get<Backup[]>(`${environment.apiUrl}/backups`).pipe(
                map((backups) => backups.map((backup) => createBackup(backup))),
                tap((backups) => patchState(store, setEntities(backups))),
              ),
            ),
            takeUntil(stopPolling$),
          ),
        ),
      ),
    );

    const stopPolling = () => stopPolling$.next();

    return {
      runBackup,
      startPolling,
      stopPolling,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
