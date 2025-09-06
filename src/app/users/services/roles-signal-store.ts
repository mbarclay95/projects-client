import { signalStore, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createRole } from '../models/role.model';

export const RolesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities({
    pluralEntityName: 'roles',
    createEntity: createRole,
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
