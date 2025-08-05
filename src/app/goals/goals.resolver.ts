import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GoalsService } from './services/state/goals.service';

@Injectable({
  providedIn: 'root',
})
export class GoalsResolver {
  constructor(private goalsService: GoalsService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.goalsService.getAllGoals();
  }
}
