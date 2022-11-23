import {Component, Input, OnInit} from '@angular/core';
import {Family} from "../../models/family.model";
import {ColorEvent} from "ngx-color";
import {User} from "../../../users/models/user.model";
import {FamiliesService} from "../../services/families/state/families.service";
import {faArrowRotateLeft, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Task} from "../../models/task.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {FamiliesQuery} from '../../services/families/state/families.query';

@Component({
  selector: 'app-my-family-members',
  templateUrl: './my-family-members.component.html',
  styleUrls: ['./my-family-members.component.scss']
})
export class MyFamilyMembersComponent implements OnInit {
  @Input() myFamily!: Family;

  newColor?: string;
  newTasksPerWeek?: number;
  isMobile = screen.width < 600;
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

  saveColor(member: User, popoverOpened: boolean) {
    if (popoverOpened) {
      this.newColor = member.taskUserConfig?.color ?? '';
    } else {
      if (!member.taskUserConfig) {
        return;
      }
      let newTaskConfig = {...member.taskUserConfig};
      if (this.newColor !== undefined) {
        newTaskConfig.color = this.newColor;
        this.newColor = undefined;
      }
      if (this.newTasksPerWeek !== undefined) {
        newTaskConfig.tasksPerWeek = this.newTasksPerWeek;
        this.newTasksPerWeek = undefined;
      }
      this.familiesService.updateTaskUserConfig(this.myFamily.id, member, newTaskConfig);
    }
  }

  colorChanged(newColor: ColorEvent) {
    this.newColor = newColor.color.hex;
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
