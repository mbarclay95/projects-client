import { Component, inject, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserGroup } from '../../../shared/models/user-group.model';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../users/models/user.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { UserGroupsSignalStore } from '../../../shared/services/user-groups-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { UsersToIdsPipe } from '../../../tasks/pipes/users-to-ids.pipe';
import { UpdatingTaskPointColorsPipe } from '../../../tasks/pipes/updating-task-point-colors.pipe';

@Component({
  selector: 'app-create-edit-user-group-modal',
  templateUrl: './create-edit-user-group-modal.component.html',
  styleUrls: ['./create-edit-user-group-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzRadioGroupComponent,
    NzRadioComponent,
    NzSelectComponent,
    NzOptionComponent,
    UsersToIdsPipe,
    UpdatingTaskPointColorsPipe,
    NzModalModule,
  ],
})
export class CreateEditUserGroupModalComponent extends DefaultModalSignalComponent<UserGroup> {
  @Input() showFamilyMembers = false;
  @Input() users: User[] = [];

  save = faSave;
  edit = faEdit;
  listOfPoints: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  readonly familiesStore = inject(UserGroupsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  saveFamily() {
    if (!this.model) {
      return;
    }
    this.familiesStore.upsert({ entity: this.model, onSuccess: () => this.familySaved() });
  }

  private familySaved(): void {
    this.nzMessageService.success('Family Saved!');
    this.familiesStore.clearCreateEditEntity();
  }

  updateFamilyMembers(userIds: number[]) {
    if (!this.model) {
      return;
    }
    this.model.members = this.users.filter((user) => userIds.includes(user.id));
  }

  updateFamilyTaskPoints(taskPoints: number[]) {
    if (!this.model) {
      return;
    }
    this.model.taskPoints = [...taskPoints.sort((a, b) => a - b)];
  }
}
