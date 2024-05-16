import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogEventStore } from './log-event.store';
import {environment} from '../../../../../environments/environment';
import {firstValueFrom, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {createLogEvent, LogEvent} from '../../../models/log-event.model';

@Injectable({ providedIn: 'root' })
export class LogEventService {

  constructor(
    private logEventStore: LogEventStore,
    private http: HttpClient
  ) {
  }

  async get(): Promise<void> {
    await firstValueFrom(this.http.get<LogEvent[]>(`${environment.apiUrl}/log-events`).pipe(
      map(logEvents => logEvents.map(logEvent => createLogEvent(logEvent))),
      tap(logEvents => this.logEventStore.set(logEvents))
    ));
  }


}
