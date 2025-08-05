import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { FamiliesQuery } from '../../services/families/state/families.query';
import { faChevronDown, faChevronUp, faFlag, faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { TasksService } from '../../services/tasks/state/tasks.service';
import { TasksQuery } from '../../services/tasks/state/tasks.query';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss'],
})
export class ViewTaskModalComponent extends DefaultModalComponent<Task> {
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  showHistory = false;
  loadingHistory = false;
  deleting = false;
  flag = faFlag;
  household = faPeopleRoof;
  personal = faUser;
  arrowDown = faChevronDown;
  arrowUp = faChevronUp;

  constructor(
    public familiesQuery: FamiliesQuery,
    private tasksService: TasksService,
    private tasksQuery: TasksQuery,
    private nzMessageService: NzMessageService,
  ) {
    super();
  }

  override onOpenModal() {
    this.showHistory = false;
    void this.loadTaskHistory();
    super.onOpenModal();
  }

  async loadTaskHistory(): Promise<void> {
    if (!this.model) {
      return;
    }
    if (this.model.taskHistory === undefined) {
      this.loadingHistory = true;
      try {
        await this.tasksService.loadTaskHistoryIfNeeded(this.model);
        this.model.taskHistory = this.tasksQuery.getEntity(this.model.id)?.taskHistory;
      } catch (e) {
        this.nzMessageService.error('There was an error getting task history');
      }
      this.loadingHistory = false;
    }
  }

  async deleteTask() {
    if (!this.model) {
      return;
    }
    this.deleting = true;
    try {
      await this.tasksService.deleteTask(this.model);
    } catch (e) {
      this.nzMessageService.error('There was an error deleting the task');
      this.deleting = false;
      return;
    }

    this.deleting = false;
    this.nzMessageService.success('Task deleted');
    this.isVisible = false;
  }

  editTaskClicked() {
    this.isVisible = false;
    this.editTask.emit(this.model);
  }
}
