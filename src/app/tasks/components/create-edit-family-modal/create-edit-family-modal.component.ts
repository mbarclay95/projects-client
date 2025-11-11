import { Component, inject, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Family } from '../../models/family.model';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../users/models/user.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { UsersToIdsPipe } from '../../pipes/users-to-ids.pipe';
import { UpdatingTaskPointColorsPipe } from '../../pipes/updating-task-point-colors.pipe';

@Component({
  selector: 'app-create-edit-family-modal',
  templateUrl: './create-edit-family-modal.component.html',
  styleUrls: ['./create-edit-family-modal.component.scss'],
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
export class CreateEditFamilyModalComponent extends DefaultModalSignalComponent<Family> {
  @Input() showFamilyMembers = false;
  @Input() users: User[] = [];

  save = faSave;
  edit = faEdit;
  listOfPoints: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  readonly familiesStore = inject(FamiliesSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  saveFamily() {
    if (!this.model) {
      return;
    }
    this.model.id === 0
      ? this.familiesStore.create({ entity: this.model, onSuccess: () => this.familySaved() })
      : this.familiesStore.update({ entity: this.model, onSuccess: () => this.familySaved() });
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
