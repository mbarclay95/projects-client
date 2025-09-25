import { Component, inject } from '@angular/core';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { Task } from '../../models/task.model';
import { addDays, addMonths, addWeeks, addYears, differenceInCalendarDays, endOfDay, setDay } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TasksSignalStore } from '../../services/tasks-signal-store';

@Component({
  selector: 'app-skip-task-modal',
  templateUrl: './skip-task-modal.component.html',
  styleUrls: ['./skip-task-modal.component.scss'],
  standalone: false,
})
export class SkipTaskModalComponent extends DefaultModalComponent<Task> {
  newDate: Date | null = null;

  readonly tasksStore = inject(TasksSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  override onOpenModal() {
    this.newDate = new Date();
    if (this.model) {
      switch (this.model.frequencyUnit) {
        case 'day':
          this.newDate = addDays(this.newDate, this.model.frequencyAmount ?? 1);
          break;
        case 'week':
          this.newDate = addWeeks(this.newDate, this.model.frequencyAmount ?? 1);
          break;
        case 'month':
          this.newDate = addMonths(this.newDate, this.model.frequencyAmount ?? 1);
          break;
        case 'year':
          this.newDate = addYears(this.newDate, this.model.frequencyAmount ?? 1);
          break;
      }
    }
  }

  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) < 0;

  async saveDate(): Promise<void> {
    if (this.model && this.newDate) {
      this.saving = true;
      const endOfWeek = setDay(endOfDay(new Date()), 0, { weekStartsOn: 1 });
      const removeFromList = endOfWeek.getTime() < this.newDate.getTime();
      this.tasksStore.update({
        entity: { ...this.model, ...{ dueDate: this.newDate } },
        removeFromStore: removeFromList,
        onSuccess: () => {
          this.nzMessageService.success('Task date updated');
          this.saving = false;
          this.isVisible = false;
        },
      });
    }
  }
}
