import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { fa1, faEdit, faPeopleRoof, faRepeat, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthQuery } from '../../../auth/services/state/auth.query';
import { FamiliesQuery } from '../../services/families/state/families.query';
import { TasksService } from '../../services/tasks/state/tasks.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskUiState } from '../../services/tasks/state/tasks.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  standalone: false,
})
export class TasksTableComponent implements OnInit, OnDestroy {
  @ViewChild('tasksTableTag', { static: true }) tasksTable: NzTableComponent<Task> | undefined;
  @Input() set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }
  @Input() ui!: TaskUiState;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  highlightedTaskId?: number;
  _tasks: Task[] = [];
  edit = faEdit;
  delete = faTrash;
  repeat = faRepeat;
  single = fa1;
  household = faPeopleRoof;
  personal = faUser;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();
  private readonly timeToShowHighlightedTask = 2000;

  constructor(
    public authQuery: AuthQuery,
    public familiesQuery: FamiliesQuery,
    public tasksService: TasksService,
    private nzMessageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((queryParams) => {
      if (queryParams.has('taskId')) {
        this.highlightedTaskId = parseInt(queryParams.get('taskId') ?? '');
        setTimeout(() => {
          this.highlightedTaskId = undefined;
          this.router.navigate([], {
            queryParams: {
              taskId: null,
            },
            queryParamsHandling: 'merge',
          });
        }, this.timeToShowHighlightedTask);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async deleteTask(task: Task): Promise<void> {
    await this.tasksService.deleteTask(task);
    this.nzMessageService.success('Task deleted');
  }
}
