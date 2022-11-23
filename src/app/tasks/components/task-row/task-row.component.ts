import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {fa0, fa1, fa2, fa3, faFlag, faPeopleRoof, faStar, faUser} from "@fortawesome/free-solid-svg-icons";
import {FamiliesQuery} from "../../services/families/state/families.query";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FamiliesService} from "../../services/families/state/families.service";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss']
})
export class TaskRowComponent implements OnInit {
  @Input() task!: Task;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  family = faPeopleRoof;
  personal = faUser;
  zeroPoints = fa0;
  onePoint = fa1;
  twoPoints = fa2;
  threePoints = fa3;
  flag = faFlag;

  constructor(
    public familiesQuery: FamiliesQuery,
    public familiesService: FamiliesService,
    public authQuery: AuthQuery,
    private tasksService: TasksService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  async completedTask(taskId: number, checked: boolean) {
    try {
      await this.tasksService.updateTask(taskId, {completedAt: new Date()}, true,true);
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
      return;
    }

    this.nzMessageService.success('Task Completed!');
    const auth = this.familiesQuery.getAuthMember();
    this.familiesService.updateTaskCompletedCount(this.familiesQuery.getActiveId() as number, auth.id, (auth.taskUserConfig?.completedFamilyTasks?.length ?? 0) + 1)
  }

  getIcon(points?: number): IconDefinition {
    switch (points) {
      case 0: return this.zeroPoints;
      case 1: return this.onePoint;
      case 2: return this.twoPoints;
      default: return this.threePoints;
    }
  }
}
