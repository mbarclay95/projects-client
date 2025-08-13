import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { createTask, Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks/state/tasks.service';
import { FamiliesQuery } from '../../services/families/state/families.query';
import { differenceInCalendarDays } from 'date-fns';
import { TagsService } from '../../services/tags.service';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';

@Component({
  selector: 'app-create-edit-task-modal',
  templateUrl: './create-edit-task-modal.component.html',
  styleUrls: ['./create-edit-task-modal.component.scss'],
  standalone: false,
})
export class CreateEditTaskModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Task>;

  task?: Task;
  isVisible: boolean = false;
  saving = false;

  subscriptionDestroyer: Subject<void> = new Subject<void>();

  readonly authStore = inject(AuthSignalStore);

  constructor(
    private tasksService: TasksService,
    private nzMessageService: NzMessageService,
    public familiesQuery: FamiliesQuery,
    public tagsService: TagsService,
  ) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((task) => {
      this.task = task.id === 0 ? task : createTask(task);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveTask() {
    if (!this.task) {
      return;
    }
    this.saving = true;
    try {
      this.task.id === 0 ? await this.tasksService.createNewTask(this.task) : await this.tasksService.updateTask(this.task.id, this.task);
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error('There was an error saving the task.');
      return;
    }
    this.nzMessageService.success('Task Saved!');
    this.saving = false;
    this.isVisible = false;
  }

  changeOwner(type: 'user' | 'family') {
    if (!this.task) {
      return;
    }
    switch (type) {
      case 'user':
        this.task.ownerId = this.authStore.auth()!.id;
        break;
      case 'family':
        this.task.ownerId = this.familiesQuery.activeId ?? 0;
    }
  }

  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) < 0;

  updateRecurring(recurring: boolean) {
    if (!this.task) {
      return;
    }
    if (recurring) {
      this.task.dueDate = undefined;
      this.task.frequencyAmount = 1;
      this.task.frequencyUnit = 'day';
    } else {
      this.task.frequencyAmount = undefined;
      this.task.frequencyUnit = undefined;
      this.task.dueDate = undefined;
    }
  }

  updateTaskPoint(taskPoint: number) {
    if (!this.task || this.task.taskPoint === taskPoint) {
      return;
    }
    this.task.taskPoint = taskPoint;
  }
}
