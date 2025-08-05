import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LogEventStore, LogEventState } from './log-event.store';

@Injectable({ providedIn: 'root' })
export class LogEventQuery extends QueryEntity<LogEventState> {
  constructor(protected store: LogEventStore) {
    super(store);
  }
}
