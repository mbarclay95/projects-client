import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { HasId } from './with-crud-feature';
import { computed, untracked } from '@angular/core';

type CreateEditEntityState<T> = {
  createEditEntityId: number | string | undefined; // use 0 to create
  initialCreateEntityState: Partial<T> | undefined;
};

const initialState: CreateEditEntityState<never> = {
  createEditEntityId: undefined,
  initialCreateEntityState: undefined,
};

type CreateEditEntityConfig<T> = {
  entityPropName?: string;
  createEntity: (data: Partial<T>) => T;
};

export function withCreateEditEntityState<T extends HasId>(config: CreateEditEntityConfig<T>) {
  return signalStoreFeature(
    withState<CreateEditEntityState<T>>(initialState),
    withComputed((store) => ({
      createEditEntity: computed(() => {
        if (store.createEditEntityId() === undefined) {
          return undefined;
        }
        if (store.createEditEntityId() === 0) {
          const initialState = { ...untracked(store.initialCreateEntityState), ...{ id: 0 } } as Partial<T>;
          return config.createEntity(initialState);
        }

        const entityPropName = config.entityPropName ?? 'entities';
        let entities: T[] = [];
        if (entityPropName in store) {
          // @ts-expect-error not sure how to properly type entityPropName to be a keyof the store this will be added to
          entities = store[entityPropName]();
        }

        const foundEntity = entities.find((entity) => entity.id === store.createEditEntityId());
        return foundEntity ? config.createEntity(foundEntity) : undefined;
      }),
    })),
    withMethods((store) => ({
      editEntity: (entityId: number) => patchState(store, { createEditEntityId: entityId }),
      createEntity: (initialState?: Partial<T>) => patchState(store, { createEditEntityId: 0, initialCreateEntityState: initialState }),
      clearCreateEditEntity: () => patchState(store, { createEditEntityId: undefined }),
    })),
  );
}
