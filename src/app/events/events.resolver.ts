import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {EventsService} from "./services/events/state/events.service";

@Injectable({
  providedIn: 'root'
})
export class EventsResolver  {

  constructor(
    private eventsService: EventsService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.eventsService.getEvents();
  }
}
