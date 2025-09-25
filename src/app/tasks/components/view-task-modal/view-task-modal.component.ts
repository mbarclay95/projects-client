import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { faChevronDown, faChevronUp, faFlag, faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { TagsSignalStore } from '../../services/tags-signal-store';

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss'],
  standalone: false,
})
export class ViewTaskModalComponent extends DefaultModalComponent<Task> {
  showHistory = false;
  loadingHistory = false;
  deleting = false;
  flag = faFlag;
  household = faPeopleRoof;
  personal = faUser;
  arrowDown = faChevronDown;
  arrowUp = faChevronUp;

  readonly familiesStore = inject(FamiliesSignalStore);
  readonly tasksStore = inject(TasksSignalStore);
  readonly tagsStore = inject(TagsSignalStore);

  constructor(private nzMessageService: NzMessageService) {
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
        this.model.taskHistory = await this.tasksStore.loadTaskHistoryIfNeeded(this.model);
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
    this.tasksStore.remove({
      id: this.model.id,
      onSuccess: () => {
        this.tagsStore.loadAll();
        this.deleting = false;
        this.nzMessageService.success('Task deleted');
        this.isVisible = false;
      },
    });
  }

  editTaskClicked() {
    if (this.model) {
      this.isVisible = false;
      this.tasksStore.editEntity(this.model.id);
    }
  }
}
