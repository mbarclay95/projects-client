import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GamingSessionsFacadeService } from './services/gaming-sessions-facade.service';

export const guestGamingResolver: ResolveFn<boolean> = (route, state) => {
  const gamingFacade = inject(GamingSessionsFacadeService);
  if (gamingFacade.emptyGamingSessions()) {
    gamingFacade.loadSessions$(undefined).subscribe();
  }

  return true;
};
