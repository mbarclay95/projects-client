import { signalStore } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { CategoryTag, createCategoryTag } from '../models/category-tag.model';
import { environment } from '../../../environments/environment';

export const CategoryTagsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<CategoryTag>({
    pluralEntityName: 'category-tags',
    createEntity: createCategoryTag,
    apiUrl: environment.moneyAppApiUrl,
  }),
);
