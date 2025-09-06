import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FamiliesService } from './services/families/state/families.service';
import { Permissions } from '../auth/permissions';
import { TagsService } from './services/tags.service';
import { MobileFooterService } from '../shared/services/mobile-footer.service';
import { TaskUserConfigsService } from './services/task-user-configs/state/task-user-configs.service';
import { AuthSignalStore } from '../auth/services/auth-signal-store';

@Injectable({
  providedIn: 'root',
})
export class TasksResolver {
  private authStore = inject(AuthSignalStore);

  constructor(
    private familiesService: FamiliesService,
    private tagsService: TagsService,
    private mobileFooterService: MobileFooterService,
    private taskUserConfigsService: TaskUserConfigsService,
  ) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    this.mobileFooterService.setFooterButtonsForTasksPage();
    const familyId = this.authStore.auth()!.familyId;
    // Have to load these first so new configs will be created before family is loaded
    if (familyId) {
      await this.taskUserConfigsService.get(familyId);
    }
    await Promise.all([this.handleFamilies(familyId), this.tagsService.getTags()]);
  }

  private async handleFamilies(familyId: number | null): Promise<void> {
    if (this.authStore.hasPermissionTo(Permissions.FAMILIES_TAB)) {
      await Promise.all([this.familiesService.getFamilies()]);
    } else if (familyId) {
      await this.familiesService.getFamily(familyId);
    }
    if (familyId) {
      this.familiesService.setActive(familyId);
    }
  }
}
