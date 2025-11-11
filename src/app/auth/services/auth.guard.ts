import { CanActivateFn, Router } from '@angular/router';
import { Permissions } from '../permissions';
import { inject } from '@angular/core';
import { AuthSignalStore } from './auth-signal-store';
import { AuthStorageService } from './auth-storage.service';

export const authGuard: CanActivateFn = async (route, _state) => {
  const authStore = inject(AuthSignalStore);
  const authStorageService = inject(AuthStorageService);
  const router = inject(Router);

  if (!authStorageService.isTokenSet()) {
    await router.navigateByUrl('login');
    return false;
  }

  if (!authStore.isLoggedIn()) {
    await authStore.getMe();
    if (!authStore.isLoggedIn()) {
      await router.navigateByUrl('login');
      return false;
    }
  }

  const hasPermission = authStore.hasPermissionTo(route.data['permission'] as unknown as Permissions | undefined);
  if (!hasPermission) {
    console.log(`does not have ${route.data['permission']} permission`);
    void router.navigateByUrl('my-profile');
  }

  return authStore.isLoggedIn();
};
