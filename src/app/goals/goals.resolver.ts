import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {GoalsService} from "./services/state/goals.service";

@Injectable({
  providedIn: 'root'
})
export class GoalsResolver implements Resolve<void> {

  constructor(
    private goalsService: GoalsService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.goalsService.getAllGoals();
  }
}
