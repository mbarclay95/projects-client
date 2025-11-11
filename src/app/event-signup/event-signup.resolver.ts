import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EventService } from './services/event.service';
import { EventCacheService } from './services/event-cache.service';

@Injectable({
  providedIn: 'root',
})
export class EventSignupResolver {
  private eventService = inject(EventService);
  private eventCacheService = inject(EventCacheService);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<void> {
    const eventId = route.params['eventId'] as string | undefined;
    const token = route.queryParams['token'] as string | undefined;
    if (eventId && token) {
      try {
        await this.eventService.getEvent(eventId, token);
      } catch (_e) {
        await this.router.navigateByUrl('events');
        return;
      }
    }

    if (this.eventService.eventNotLoaded()) {
      await this.router.navigateByUrl('events');
      return;
    }
    this.eventCacheService.loadEventCache();
  }
}
