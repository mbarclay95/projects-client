import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

type UiState<T> = {
  ui: T;
};

export function withUi<T>(initialState: T) {
  return signalStoreFeature(
    withState<UiState<T>>({ ui: initialState }),
    withMethods((store) => ({
      updateUiState: (newState: Partial<T>) => patchState(store, { ui: { ...store.ui(), ...newState } }),
    })),
  );
}
