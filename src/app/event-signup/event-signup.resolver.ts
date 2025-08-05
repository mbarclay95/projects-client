import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EventService } from './services/event.service';
import { EventCacheService } from './services/event-cache.service';

@Injectable({
  providedIn: 'root',
})
export class EventSignupResolver {
  constructor(
    private eventService: EventService,
    private eventCacheService: EventCacheService,
    private router: Router,
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    const eventId = route.params['eventId'] as string | undefined;
    const token = route.queryParams['token'] as string | undefined;
    if (eventId && token) {
      try {
        await this.eventService.getEvent(eventId, token);
      } catch (e) {
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
