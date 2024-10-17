import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {GamingSessionsFacadeService} from './services/gaming-sessions-facade.service';
import {UserGamingSessionsService} from './services/user-gaming-sessions.service';

export const gamingResolver: ResolveFn<boolean> = (route, state) => {
  const gamingFacade = inject(GamingSessionsFacadeService);
  const userGamingSessionsService = inject(UserGamingSessionsService);
  userGamingSessionsService.initialize();
  gamingFacade.loadSessions();
  gamingFacade.loadDevices();
  gamingFacade.startDevicePolling();
  gamingFacade.connectToWs();

  return true;
};
