import { signalStore, withComputed, withHooks } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { Category, createCategory } from '../models/category.model';
import { environment } from '../../../environments/environment';
import { computed } from '@angular/core';

export const CategoriesSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Category>({
    pluralEntityName: 'categories',
    createEntity: createCategory,
    apiUrl: environment.moneyAppApiUrl,
  }),
  withComputed(({ entities }) => {
    const sortedCategories = computed(() => entities().sort((a, b) => a.sort - b.sort));
    const activeCategories = computed(() => sortedCategories().filter((c) => c.isActive));
    const activeNotIncomeCategories = computed(() => activeCategories().filter((c) => !c.income));

    return {
      activeCategories,
      activeNotIncomeCategories,
    };
  }),
  withHooks({
    onInit(store) {
      store.loadAll({});
    },
  }),
);
