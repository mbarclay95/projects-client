import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {faPeopleRoof, faUser} from "@fortawesome/free-solid-svg-icons";
import {FamiliesQuery} from "../../services/families/state/families.query";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FamiliesService} from "../../services/families/state/families.service";

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
      await this.tasksService.updateTask(taskId, {completedAt: new Date()}, true);
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
      return;
    }

    this.nzMessageService.success('Task Completed!');
    const auth = this.familiesQuery.getAuthMember();
    this.familiesService.updateTaskCompletedCount(this.familiesQuery.getActiveId() as number, auth.id, (auth.taskUserConfig?.familyTasksCompleted ?? 0) + 1)
  }
}
