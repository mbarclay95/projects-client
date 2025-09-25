import { signalStore, withHooks } from '@ngrx/signals';
import { createTarget, Target } from '../models/target.model';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';

export const TargetSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Target>({
    pluralEntityName: 'targets',
    createEntity: createTarget,
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
