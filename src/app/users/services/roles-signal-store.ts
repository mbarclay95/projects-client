import { signalStore, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createRole, Role } from '../models/role.model';

export const RolesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Role>({
    pluralEntityName: 'roles',
    createEntity: createRole,
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
