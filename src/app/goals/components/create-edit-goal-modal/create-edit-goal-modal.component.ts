import { Component, inject } from '@angular/core';
import { EqualityDropDown, Goal, LengthOfTimeDropDown } from '../../models/goal.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GoalsSignalStore } from '../../services/goals-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-create-edit-goal-modal',
  templateUrl: './create-edit-goal-modal.component.html',
  styleUrls: ['./create-edit-goal-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzSelectComponent,
    NzInputNumberComponent,
    NzModalFooterDirective,
    NzButtonComponent,
    NzPopconfirmDirective,
  ],
})
export class CreateEditGoalModalComponent extends DefaultModalSignalComponent<Goal> {
  equalityDrownDown = EqualityDropDown;
  lengthOfTimeDrownDown = LengthOfTimeDropDown;
  deleting = false;

  readonly goalsStore = inject(GoalsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  saveGoal() {
    if (!this.model) {
      return;
    }
    if (this.model.id === 0) {
      this.goalsStore.create({ entity: this.model, onSuccess: () => this.goalSaved() });
    } else {
      this.goalsStore.update({ entity: this.model, onSuccess: () => this.goalSaved() });
    }
  }

  goalSaved(): void {
    this.nzMessageService.success('Goal saved!');
    this.goalsStore.clearCreateEditEntity();
  }

  async deleteGoal(): Promise<void> {
    if (!this.model) {
      return;
    }
    this.deleting = true;
    this.goalsStore.remove({
      id: this.model.id,
      onSuccess: () => {
        this.nzMessageService.success('Goal deleted!');
        this.deleting = false;
        this.goalsStore.clearCreateEditEntity();
      },
    });
  }
}
