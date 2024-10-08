import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {GamingSessionsFacadeService} from './services/gaming-sessions-facade.service';

export const gamingResolver: ResolveFn<boolean> = (route, state) => {
  const gamingFacade = inject(GamingSessionsFacadeService);
  gamingFacade.loadSessions();
  gamingFacade.loadDevices();
  gamingFacade.connectToWs();

  return true;
};
