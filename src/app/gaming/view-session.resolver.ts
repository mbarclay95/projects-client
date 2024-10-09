import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {GamingSessionsFacadeService} from './services/gaming-sessions-facade.service';

export const viewSessionResolver: ResolveFn<boolean> = (route, state) => {
  const gamingFacade = inject(GamingSessionsFacadeService);
  if (route.params['id']) {
    gamingFacade.setSessionActiveId(parseInt(route.params['id'], 10));
  }
  return true;
};
