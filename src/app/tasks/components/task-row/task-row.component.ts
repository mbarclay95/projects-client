import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {fa0, fa1, fa2, fa3, faFlag, faPeopleRoof, faUser} from "@fortawesome/free-solid-svg-icons";
import {FamiliesQuery} from "../../services/families/state/families.query";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from '@angular/router';
import {isMobile} from '../../../app.component';
import Color from 'colorjs.io';
import {TaskUserConfigsService} from '../../services/task-user-configs/state/task-user-configs.service';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss']
})
export class TaskRowComponent implements OnInit {
  @Input() task!: Task;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  isMobile = isMobile;
  family = faPeopleRoof;
  personal = faUser;
  zeroPoints = fa0;
  onePoint = fa1;
  twoPoints = fa2;
  threePoints = fa3;
  flag = faFlag;

  startColor = new Color('#A9B31E');
  endColor = new Color('#214897');
  range = this.startColor.range(this.endColor, {
    space: 'lch',
    hue: undefined,
    outputSpace: 'srgb'
  });

  constructor(
    public familiesQuery: FamiliesQuery,
    public authQuery: AuthQuery,
    private tasksService: TasksService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private taskUserConfigsService: TaskUserConfigsService
  ) { }

  ngOnInit(): void {
  }

  async completedTask(taskId: number) {
    try {
      const completedTask = await this.tasksService.updateTask(taskId, {completedAt: new Date()}, true,true);
      this.taskUserConfigsService.addCompletedTaskToActive(completedTask);
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
