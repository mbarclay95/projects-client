import { signalStore, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createUser } from '../models/user.model';

export const UsersSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities({
    pluralEntityName: 'users',
    createEntity: createUser,
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
