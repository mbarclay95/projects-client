import { signalStore, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createUser, User } from '../models/user.model';

export const UsersSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<User>({
    pluralEntityName: 'users',
    createEntity: createUser,
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
