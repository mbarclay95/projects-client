import { CanActivateFn, Router } from '@angular/router';
import { Permissions } from '../permissions';
import { inject } from '@angular/core';
import { AuthSignalStore } from './auth-signal-store';

export const authGuard: CanActivateFn = async (route, state) => {
  const authStore = inject(AuthSignalStore);
  const router = inject(Router);
  if (!authStore.isLoggedIn()) {
    await router.navigateByUrl('login');
    return false;
  }
  const hasPermission = authStore.hasPermissionTo(route.data['permission'] as unknown as Permissions | undefined);
  if (!hasPermission) {
    console.log(`does not have ${route.data['permission']} permission`);
    void router.navigateByUrl('my-profile');
  }

  return authStore.isLoggedIn();
};
