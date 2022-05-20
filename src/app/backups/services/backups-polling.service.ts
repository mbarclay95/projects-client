import {Injectable} from '@angular/core';
import {BackupsQuery} from "./backups/state/backups.query";
import {BackupsService} from "./backups/state/backups.service";
import {exhaustMap, Subject, takeUntil, tap, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackupsPollingService {

  private stopPollingSubject: Subject<void> = new Subject<void>();

  constructor(
    private backupsQuery: BackupsQuery,
    private backupsService: BackupsService,
  ) {
  }

  stopPolling(): void {
    this.stopPollingSubject.next();
  }

  startPolling(): void {
    this.stopPollingSubject.next();
    timer(0, 1000).pipe(
      takeUntil(this.stopPollingSubject),
      tap(() => {
        const backups = this.backupsQuery.getAll();
        const numberOfNotCompleted = backups.filter((b) => !b.completedAt && !b.erroredAt).length;
        if (numberOfNotCompleted === 0) {
          this.stopPolling();
        }
      }),
      exhaustMap(() => this.backupsService.getBackups$())
    ).subscribe();
  }
}
