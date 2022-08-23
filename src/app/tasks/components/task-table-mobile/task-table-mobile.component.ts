import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskUiState} from "../../services/tasks/state/tasks.store";
import {
  fa1,
  faChevronDown,
  faChevronUp,
  faEdit,
  faPeopleRoof,
  faRepeat,
  faTrash, faUser
} from "@fortawesome/free-solid-svg-icons";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {FamiliesQuery} from "../../services/families/state/families.query";

@Component({
  selector: 'app-task-table-mobile',
  templateUrl: './task-table-mobile.component.html',
  styleUrls: ['./task-table-mobile.component.scss']
})
export class TaskTableMobileComponent implements OnInit {
  @Input() set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }

  @Input() ui!: TaskUiState;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  _tasks: Task[] = [];
  expandSet = new Set<number>();
  arrowDown = faChevronDown;
  arrowUp = faChevronUp;
  edit = faEdit;
  delete = faTrash;
  repeat = faRepeat;
  single = fa1;
  household = faPeopleRoof;
  personal = faUser;

  constructor(
    public authQuery: AuthQuery,
    public familiesQuery: FamiliesQuery,
    public tasksService: TasksService,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }

  async deleteTask(task: Task): Promise<void> {
    await this.tasksService.deleteTask(task);
    this.nzMessageService.success('Task deleted');
  }

}
