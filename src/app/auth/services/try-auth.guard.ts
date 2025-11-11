import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSignalStore } from './auth-signal-store';
import { AuthStorageService } from './auth-storage.service';

export const tryAuthGuard: CanActivateFn = async (_route, _state) => {
  const authStore = inject(AuthSignalStore);
  const authStorageService = inject(AuthStorageService);
  if (!authStore.isLoggedIn() && authStorageService.isTokenSet()) {
    await authStore.getMe();
  }

  return true;
};
