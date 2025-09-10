import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Task } from '../../models/task.model';
import { differenceInCalendarDays } from 'date-fns';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { TagsSignalStore } from '../../services/tags-signal-store';

@Component({
  selector: 'app-create-edit-task-modal',
  templateUrl: './create-edit-task-modal.component.html',
  styleUrls: ['./create-edit-task-modal.component.scss'],
  standalone: false,
})
export class CreateEditTaskModalComponent extends DefaultModalSignalComponent<Task> {
  readonly authStore = inject(AuthSignalStore);
  readonly familiesStore = inject(FamiliesSignalStore);
  readonly tasksStore = inject(TasksSignalStore);
  readonly nzMessageService = inject(NzMessageService);
  readonly tagsStore = inject(TagsSignalStore);

  saveTask() {
    if (!this.model) {
      return;
    }
    this.model.id === 0
      ? this.tasksStore.create({ entity: this.model, onSuccess: () => this.taskSaved() })
      : this.tasksStore.update({ entity: this.model, onSuccess: () => this.taskSaved() });
  }

  taskSaved(): void {
    this.tagsStore.loadAll();
    this.nzMessageService.success('Task Saved!');
    this.tasksStore.clearCreateEditEntity();
  }

  changeOwner(type: 'user' | 'family') {
    if (!this.model) {
      return;
    }
    switch (type) {
      case 'user':
        this.model.ownerId = this.authStore.auth()!.id;
        break;
      case 'family':
        this.model.ownerId = this.familiesStore.activeFamilyId() ?? 0;
    }
  }

  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) < 0;

  updateRecurring(recurring: boolean) {
    if (!this.model) {
      return;
    }
    if (recurring) {
      this.model.dueDate = undefined;
      this.model.frequencyAmount = 1;
      this.model.frequencyUnit = 'day';
    } else {
      this.model.frequencyAmount = undefined;
      this.model.frequencyUnit = undefined;
      this.model.dueDate = undefined;
    }
  }

  updateTaskPoint(taskPoint: number) {
    if (!this.model || this.model.taskPoint === taskPoint) {
      return;
    }
    this.model.taskPoint = taskPoint;
  }
}
