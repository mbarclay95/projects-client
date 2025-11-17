import { signalStore, withComputed, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createSubCategory, SubCategory } from '../models/sub-category.model';
import { environment } from '../../../environments/environment';
import { computed } from '@angular/core';

export const SubCategoriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<SubCategory>({
    pluralEntityName: 'sub-categories',
    createEntity: createSubCategory,
    apiUrl: environment.moneyAppApiUrl,
  }),
  withComputed(({ entities }) => {
    const sortedSubCategories = computed(() => entities().sort((a, b) => a.sort - b.sort));
    const activeSubCategories = computed(() => sortedSubCategories().filter((s) => s.isActive));

    return {
      activeSubCategories,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
