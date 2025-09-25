import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSignalStore } from './auth-signal-store';
import { Permissions } from '../permissions';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authStore = inject(AuthSignalStore);
  const router = inject(Router);

  const hasPermission = authStore.hasPermissionTo(childRoute.data['permission'] as unknown as Permissions | undefined);

  if (!hasPermission) {
    console.log(`does not have ${childRoute.data['permission']} permission`);
    void router.navigateByUrl('my-profile');
  }

  return hasPermission;
};
