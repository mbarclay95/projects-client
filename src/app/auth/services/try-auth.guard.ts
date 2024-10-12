import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './state/auth.service';

export const tryAuthGuard: CanActivateFn = async (route, state) => {
  try {
    await inject(AuthService).getMe();
  } catch (e) {
  }

  return true;
};
