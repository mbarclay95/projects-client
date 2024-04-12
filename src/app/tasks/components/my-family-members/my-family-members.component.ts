import {Component, Input, OnInit} from '@angular/core';
import {TaskStrategy} from "../../models/family.model";
import {faArrowRotateLeft, faCog, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Task} from "../../models/task.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {FamiliesQuery} from '../../services/families/state/families.query';
import {isMobile} from '../../../app.component';
import {TaskUserConfig} from '../../models/task-user-config.model';
import {TaskUserConfigsService} from '../../services/task-user-configs/state/task-user-configs.service';

@Component({
  selector: 'app-my-family-members',
  templateUrl: './my-family-members.component.html',
  styleUrls: ['./my-family-members.component.scss']
})
export class MyFamilyMembersComponent implements OnInit {
  @Input() familyTaskStrategy!: TaskStrategy;
  @Input() membersConfig: TaskUserConfig[] | null = [];
  @Input() weekOffset!: number | null;
  @Input() loading = false;

  newTasksPerWeek?: number;
  isMobile = isMobile;
  settings = faCog;
  undo = faArrowRotateLeft;
  spinner = faSpinner;
  loadingUndoId: number|null = null;

  constructor(
    public familiesQuery: FamiliesQuery,
    private nzMessageService: NzMessageService,
    private tasksService: TasksService,
    private taskUserConfigsService: TaskUserConfigsService
  ) { }

  ngOnInit(): void {
  }

  saveSettings(memberConfig: TaskUserConfig, popoverOpened: boolean) {
    if (!popoverOpened) {
      let newTaskConfig = {...memberConfig};
      if (this.newTasksPerWeek !== undefined) {
        newTaskConfig.tasksPerWeek = this.newTasksPerWeek;
        this.newTasksPerWeek = undefined;
      }
      if (memberConfig.tasksPerWeek !== newTaskConfig.tasksPerWeek) {
        void this.taskUserConfigsService.updateTaskUserConfig(newTaskConfig);
      }
    }
  }

  tasksPerWeekChanged(newTasksPerWeek: number) {
    this.newTasksPerWeek = newTasksPerWeek;
  }

  async undoTask(memberConfigId: number, task: Task) {
    this.loadingUndoId  = task.id;
    await this.tasksService.updateTask(task.id,  {...task,  ...{completedAt: undefined}}, false);
    this.taskUserConfigsService.removeTaskFromConfig(memberConfigId, task.id);
    this.loadingUndoId = null;
    this.nzMessageService.success('Chore has been removed!');
  }
}
