import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {GoalsService} from "./services/state/goals.service";

@Injectable({
  providedIn: 'root'
})
export class GoalsResolver implements Resolve<void> {

  constructor(
    private goalsService: GoalsService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.goalsService.getAllGoals();
  }
}
