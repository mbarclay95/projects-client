import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {TasksService} from "./services/tasks/state/tasks.service";
import {FamiliesService} from "./services/families/state/families.service";

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<void> {

  constructor(
    private tasksService: TasksService,
    private familiesService: FamiliesService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.tasksService.getTasks();
    await this.familiesService.getFamilies();
  }
}
