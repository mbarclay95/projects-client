import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {FamiliesService} from "./services/families/state/families.service";
import {UsersService} from "../users/services/state/users.service";
import {PermissionsService} from "../auth/services/permissions.service";
import {Permissions} from "../auth/permissions";
import {AuthQuery} from "../auth/services/state/auth.query";
import {TagsService} from "./services/tags.service";
import {MobileFooterService} from "../shared/services/mobile-footer.service";
import {TaskUserConfigsService} from './services/task-user-configs/state/task-user-configs.service';

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<void> {

  constructor(
    private familiesService: FamiliesService,
    private usersService: UsersService,
    private permissionsService: PermissionsService,
    private tagsService: TagsService,
    private authQuery: AuthQuery,
    private mobileFooterService: MobileFooterService,
    private taskUserConfigsService: TaskUserConfigsService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    this.mobileFooterService.setFooterButtonsForTasksPage();
    const familyId = this.authQuery.getValue().familyId;
    // Have to load these first so new configs will be created before family is loaded
    if (familyId) {
      await this.taskUserConfigsService.get(familyId);
    }
    await Promise.all([
      this.handleFamilies(familyId),
      this.tagsService.getTags()
    ]);
  }

  private async handleFamilies(familyId: number | null): Promise<void> {
    if (this.permissionsService.hasPermissionTo(Permissions.FAMILIES_TAB)) {
      await Promise.all([
        this.familiesService.getFamilies(),
        this.usersService.getUsers()
      ]);
    } else if (familyId) {
      await this.familiesService.getFamily(familyId);
    }
    if (familyId) {
      this.familiesService.setActive(familyId);
    }
  }
}
