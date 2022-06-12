import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TasksService} from "./services/tasks/state/tasks.service";
import {FamiliesService} from "./services/families/state/families.service";
import {UsersService} from "../users/services/state/users.service";
import {PermissionsService} from "../auth/services/permissions.service";
import {Permissions} from "../auth/permissions";
import {AuthQuery} from "../auth/services/state/auth.query";

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<void> {

  constructor(
    private tasksService: TasksService,
    private familiesService: FamiliesService,
    private usersService: UsersService,
    private permissionsService: PermissionsService,
    private authQuery: AuthQuery
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    const familyId = this.authQuery.getFamilyId();
    if (this.permissionsService.hasPermissionTo(Permissions.FAMILIES_TAB)) {
      await this.familiesService.getFamilies();
    } else if (familyId) {
      await this.familiesService.getFamily(familyId);
    }
    if (familyId) {
      this.familiesService.setActive(familyId);
    }
    await this.usersService.getUsers();
  }
}
