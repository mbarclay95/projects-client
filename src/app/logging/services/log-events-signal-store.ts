import { signalStore, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createLogEvent, LogEvent } from '../models/log-event.model';

export const LogEventsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<LogEvent>({
    pluralEntityName: 'log-events',
    createEntity: createLogEvent,
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
