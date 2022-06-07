import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {createTask, Task} from "../../models/task.model";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {FamiliesQuery} from "../../services/families/state/families.query";
import {differenceInCalendarDays} from "date-fns";

@Component({
  selector: 'app-create-edit-task-modal',
  templateUrl: './create-edit-task-modal.component.html',
  styleUrls: ['./create-edit-task-modal.component.scss']
})
export class CreateEditTaskModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Task>;

  task!: Task;
  isVisible: boolean = false;
  saving = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private tasksService: TasksService,
    private nzMessageService: NzMessageService,
    private authQuery: AuthQuery,
    private familiesQuery: FamiliesQuery
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(task => {
      this.task = task.id === 0 ? task : createTask(task);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveTask() {
    this.saving = true;
    try {
      this.task.id === 0 ?
        await this.tasksService.createNewTask(this.task) :
        await this.tasksService.updateTask(this.task);
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error("There was an error saving the task.");
      return;
    }
    this.nzMessageService.success('Task Saved!');
    this.saving = false;
    this.isVisible = false;
  }

  changeOwner(type: 'user' | 'family') {
    switch (type) {
      case "user":
        this.task.ownerId = this.authQuery.getUser().id;
        break;
      case "family":
        this.task.ownerId = this.familiesQuery.activeId ?? 0;
    }
  }

  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) < 0;

  updateRecurring(recurring: boolean) {
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
}
