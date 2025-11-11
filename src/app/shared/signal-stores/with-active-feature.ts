import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { HasId } from './with-crud-feature';
import { computed, Signal } from '@angular/core';

type ActiveState = {
  activeId: number | undefined;
};

export function withActive<T extends HasId>(config?: ActiveState) {
  return signalStoreFeature(
    withState<ActiveState>({ activeId: config?.activeId }),
    withComputed((store) => ({
      activeEntity: computed(() => {
        if (store.activeId() !== undefined && 'entities' in store) {
          return (store.entities as Signal<T[]>)().find((e) => e.id === store.activeId());
        }

        return undefined;
      }),
    })),
    withMethods((store) => ({
      setActiveId: (activeId: number) => patchState(store, { activeId }),
      clearActive: () => patchState(store, { activeId: undefined }),
    })),
  );
}
