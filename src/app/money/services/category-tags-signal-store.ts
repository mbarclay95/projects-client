import { signalStore, withComputed, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { CategoryTag, createCategoryTag } from '../models/category-tag.model';
import { environment } from '../../../environments/environment';
import { computed } from '@angular/core';

export const CategoryTagsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<CategoryTag>({
    pluralEntityName: 'category-tags',
    createEntity: createCategoryTag,
    apiUrl: environment.moneyAppApiUrl,
  }),
  withComputed(({ entities }) => {
    const activeEntities = computed(() => entities().filter((c) => c.isActive));

    return { activeEntities };
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
