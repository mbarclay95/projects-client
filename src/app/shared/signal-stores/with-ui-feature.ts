import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

type UiState<T> = {
  ui: T;
  shouldHttpReload: boolean; // purely a helper boolean to be used when monitoring ui changes
};

export function withUi<T>(initialState: T) {
  return signalStoreFeature(
    withState<UiState<T>>({ ui: initialState, shouldHttpReload: true }),
    withMethods((store) => ({
      updateUiState: (newState: Partial<T>, shouldHttpReload = true) =>
        patchState(store, { ui: { ...store.ui(), ...newState, shouldHttpReload } }),
    })),
  );
}
