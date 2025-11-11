import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { faChevronDown, faChevronUp, faFlag, faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { TagsSignalStore } from '../../services/tags-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { DatePipe } from '@angular/common';
import { DueDateHumanReadablePipe } from '../../pipes/due-date-human-readable.pipe';
import { TaskPointColorPipe } from '../../pipes/task-point-color.pipe';
import { FrequencyToStringPipe } from '../../pipes/frequency-to-string.pipe';

@Component({
  selector: 'app-view-task-modal',
  templateUrl: './view-task-modal.component.html',
  styleUrls: ['./view-task-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    FaIconComponent,
    NzDividerComponent,
    NzSpinComponent,
    NzModalFooterDirective,
    NzButtonComponent,
    NzPopconfirmDirective,
    DatePipe,
    DueDateHumanReadablePipe,
    TaskPointColorPipe,
    FrequencyToStringPipe,
  ],
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
  readonly nzMessageService = inject(NzMessageService);

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
      } catch (_e) {
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
