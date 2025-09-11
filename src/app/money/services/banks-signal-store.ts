import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { Bank, createBank } from '../models/bank.model';
import { environment } from '../../../environments/environment';

export const BanksSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Bank>({
    pluralEntityName: 'banks',
    createEntity: createBank,
    apiUrl: environment.moneyAppApiUrl,
  }),
);
