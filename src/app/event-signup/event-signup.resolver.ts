import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {EventService} from "./services/event.service";

@Injectable({
  providedIn: 'root'
})
export class EventSignupResolver implements Resolve<Promise<void>> {

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    const eventId = route.params['eventId'] as string|undefined;
    const token = route.queryParams['token'] as string|undefined;
    if (eventId && token) {
      try {
        await this.eventService.getEvent(eventId, token);
      } catch (e) {
        await this.router.navigateByUrl('events');
      }
    }

    if (this.eventService.eventNotLoaded()) {
      await this.router.navigateByUrl('events');
    }
  }
}
