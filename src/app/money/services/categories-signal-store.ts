import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { Category, createCategory } from '../models/category.model';
import { environment } from '../../../environments/environment';

export const CategoriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Category>({
    pluralEntityName: 'categories',
    createEntity: createCategory,
    apiUrl: environment.moneyAppApiUrl,
  }),
);
