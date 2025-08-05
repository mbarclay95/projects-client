import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { LogEvent } from '../../../models/log-event.model';

export interface LogEventState extends EntityState<LogEvent> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'log-event' })
export class LogEventStore extends EntityStore<LogEventState> {
  constructor() {
    super();
  }
}
