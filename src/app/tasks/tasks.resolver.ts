import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TasksService} from "./services/tasks/state/tasks.service";
import {FamiliesService} from "./services/families/state/families.service";
import {UsersService} from "../users/services/state/users.service";
import {PermissionsService} from "../auth/services/permissions.service";
import {Permissions} from "../auth/permissions";
import {AuthQuery} from "../auth/services/state/auth.query";
import {TagsService} from "./services/tags.service";
import {MobileFooterService} from "../shared/services/mobile-footer.service";
import {faPeopleGroup, faPeopleRoof, faTableList, faTasks} from "@fortawesome/free-solid-svg-icons";
import {MobileHeaderService} from "../shared/services/mobile-header.service";

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<void> {

  constructor(
    private tasksService: TasksService,
    private familiesService: FamiliesService,
    private usersService: UsersService,
    private permissionsService: PermissionsService,
    private tagsService: TagsService,
    private authQuery: AuthQuery,
    private mobileFooterService: MobileFooterService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    if (screen.width < 600) {
      const footerButtons = [
        {
          icon: faTasks,
          title: 'To Do',
          path: '/app/tasks/weekly-tasks'
        },
        {
          icon: faPeopleRoof,
          title: 'My Family',
          path: '/app/tasks/my-family'
        },
        {
          icon: faTableList,
          title: 'Tasks',
          path: '/app/tasks/tasks'
        },
      ];
      if (this.permissionsService.hasPermissionTo(Permissions.FAMILIES_TAB)) {
        footerButtons.push({
          icon: faPeopleGroup,
          title: 'Families',
          path: '/app/tasks/families'
        });
      }
      this.mobileFooterService.setFooterButtons(footerButtons);
    }
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
    await this.tagsService.getTags();
  }
}
