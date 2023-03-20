import {Component, Input, OnInit} from '@angular/core';
import {Family} from "../../models/family.model";
import {User} from "../../../users/models/user.model";
import {FamiliesService} from "../../services/families/state/families.service";
import {faArrowRotateLeft, faCog, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Task} from "../../models/task.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {FamiliesQuery} from '../../services/families/state/families.query';
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-my-family-members',
  templateUrl: './my-family-members.component.html',
  styleUrls: ['./my-family-members.component.scss']
})
export class MyFamilyMembersComponent implements OnInit {
  @Input() myFamily!: Family;

  newTasksPerWeek?: number;
  isMobile = isMobile;
  settings = faCog;
  undo = faArrowRotateLeft;
  spinner = faSpinner;
  loadingUndoId: number|null = null;

  constructor(
    private familiesService: FamiliesService,
    public familiesQuery: FamiliesQuery,
    private nzMessageService: NzMessageService,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
  }

  saveSettings(member: User, popoverOpened: boolean) {
    if (!popoverOpened) {
      if (!member.taskUserConfig) {
        return;
      }
      let newTaskConfig = {...member.taskUserConfig};
      if (this.newTasksPerWeek !== undefined) {
        newTaskConfig.tasksPerWeek = this.newTasksPerWeek;
        this.newTasksPerWeek = undefined;
      }
      if (member.taskUserConfig.tasksPerWeek !== newTaskConfig.tasksPerWeek) {
        this.familiesService.updateTaskUserConfig(this.myFamily.id, member, newTaskConfig);
      }
    }
  }

  tasksPerWeekChanged(newTasksPerWeek: number) {
    this.newTasksPerWeek = newTasksPerWeek;
  }

  async undoTask(task: Task) {
    this.loadingUndoId  = task.id;
    await this.tasksService.updateTask(task.id,  {...task,  ...{completedAt: undefined}}, false);
    await this.familiesService.refreshActiveFamily();
    this.loadingUndoId = null;
    this.nzMessageService.success('Chore has been removed!');
  }
}
