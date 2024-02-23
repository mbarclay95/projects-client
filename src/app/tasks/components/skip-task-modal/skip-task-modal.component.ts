import {Component} from '@angular/core';
import {DefaultModalComponent} from '../../../shared/components/default-modal/default-modal.component';
import {Task} from '../../models/task.model';
import {addDays, addMonths, addWeeks, addYears, differenceInCalendarDays, endOfDay, setDay} from 'date-fns';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TasksService} from '../../services/tasks/state/tasks.service';

@Component({
  selector: 'app-skip-task-modal',
  templateUrl: './skip-task-modal.component.html',
  styleUrls: ['./skip-task-modal.component.scss']
})
export class SkipTaskModalComponent extends DefaultModalComponent<Task> {
  newDate: Date | null = null;

  constructor(
    private nzMessageService: NzMessageService,
    private tasksService: TasksService
  ) {
    super();
  }

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
      const endOfWeek = setDay(endOfDay(new Date()), 0, {weekStartsOn: 1});
      const removeFromList = endOfWeek.getTime() < this.newDate.getTime();
      try {
        await this.tasksService.updateTask(this.model.id, {dueDate: this.newDate}, false, removeFromList);
      } catch (e) {
        this.nzMessageService.error('There was an error skipping the task');
        this.saving = false;
        return;
      }

      this.nzMessageService.success('Task date updated');
      this.saving = false;
      this.isVisible = false;
    }
  }
}
