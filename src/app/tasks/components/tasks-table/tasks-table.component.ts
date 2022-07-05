import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../models/task.model";
import {NzTableComponent} from "ng-zorro-antd/table";
import {fa1, faEdit, faPeopleRoof, faRepeat, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  @ViewChild('tasksTableTag', {static: true}) tasksTable: NzTableComponent<Task> | undefined;
  @Input() set tasks(tasks: Task[]) {
      this._tasks = tasks;
  }
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  _tasks: Task[] = [];
  edit = faEdit;
  delete = faTrash;
  repeat = faRepeat;
  single = fa1;
  household = faPeopleRoof;
  personal = faUser;

  constructor(
    public authQuery: AuthQuery,
    public familiesQuery: FamiliesQuery,
    private tasksService: TasksService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  async deleteTask(task: Task): Promise<void> {
    await this.tasksService.deleteTask(task);
    this.nzMessageService.success('Task deleted');
  }

}
