import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createSchedule, Schedule } from '../models/schedule.model';

export const SchedulesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Schedule>({
    pluralEntityName: 'schedules',
    createEntity: createSchedule,
  }),
);
