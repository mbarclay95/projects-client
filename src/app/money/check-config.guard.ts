import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSignalStore } from '../auth/services/auth-signal-store';

export const checkConfigGuard: CanActivateChildFn = () => {
  const authStore = inject(AuthSignalStore);
  const router = inject(Router);
  if (!authStore.hasMoneyAppToken()) {
    void router.navigateByUrl('/app/money/incorrect-config');
    return false;
  }

  return true;
};
