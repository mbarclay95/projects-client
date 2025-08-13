import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { faArrowRightToBracket, faEdit, faEllipsisV, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FamiliesQuery } from '../../services/families/state/families.query';
import { TasksService } from '../../services/tasks/state/tasks.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { isMobile } from '../../../app.component';
import { TaskUserConfigsService } from '../../services/task-user-configs/state/task-user-configs.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  standalone: false,
})
export class TaskRowComponent implements OnInit {
  @Input() task!: Task;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() skipTask: EventEmitter<Task> = new EventEmitter<Task>();

  menuVisible = false;
  isMobile = isMobile;
  flag = faFlag;
  more = faEllipsisV;
  eye = faEye;
  edit = faEdit;
  skip = faArrowRightToBracket;

  constructor(
    public familiesQuery: FamiliesQuery,
    private tasksService: TasksService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private taskUserConfigsService: TaskUserConfigsService,
  ) {}

  ngOnInit(): void {}

  async completedTask(taskId: number) {
    try {
      const completedTask = await this.tasksService.updateTask(taskId, { completedAt: new Date() }, true, true);
      if (completedTask) {
        this.taskUserConfigsService.addCompletedTaskToActive(completedTask);
      }
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
      return;
    }

    this.nzMessageService.success('Task Completed!');
  }

  goToTask() {
    window.navigator.vibrate(300);
    const route = this.isMobile ? `app/tasks/tasks?taskId=${this.task.id}` : `app/tasks?tab=tasks&taskId=${this.task.id}`;
    this.router.navigateByUrl(route);
  }
}
