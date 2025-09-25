import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createSubCategory, SubCategory } from '../models/sub-category.model';
import { environment } from '../../../environments/environment';

export const SubCategoriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<SubCategory>({
    pluralEntityName: 'sub-categories',
    createEntity: createSubCategory,
    apiUrl: environment.moneyAppApiUrl,
  }),
);
