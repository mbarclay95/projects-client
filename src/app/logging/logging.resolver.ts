import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LogEventService } from './services/log-event/state/log-event.service';

@Injectable({
  providedIn: 'root',
})
export class LoggingResolver {
  constructor(private logEventService: LogEventService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.logEventService.get();
  }
}
