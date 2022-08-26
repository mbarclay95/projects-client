import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {EventsService} from "./services/events/state/events.service";
import {MobileFooterService} from "../shared/services/mobile-footer.service";
import {MobileHeaderService} from "../shared/services/mobile-header.service";

@Injectable({
  providedIn: 'root'
})
export class EventsResolver implements Resolve<void> {

  constructor(
    private eventsService: EventsService,
    private mobileFooterService: MobileFooterService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.eventsService.getEvents();
    this.mobileFooterService.setFooterButtons([]);
  }
}
