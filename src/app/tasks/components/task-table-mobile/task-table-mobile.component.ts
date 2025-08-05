import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskUiState } from '../../services/tasks/state/tasks.store';
import {
  fa1,
  faChevronDown,
  faChevronUp,
  faEdit,
  faFlag,
  faPeopleRoof,
  faRepeat,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { TasksService } from '../../services/tasks/state/tasks.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthQuery } from '../../../auth/services/state/auth.query';
import { FamiliesQuery } from '../../services/families/state/families.query';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-table-mobile',
  templateUrl: './task-table-mobile.component.html',
  styleUrls: ['./task-table-mobile.component.scss'],
  standalone: false,
})
export class TaskTableMobileComponent implements OnInit {
  @Input() set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }

  @Input() ui!: TaskUiState;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();

  highlightedTaskId?: number;
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
  flag = faFlag;

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
        const taskId = parseInt(queryParams.get('taskId') ?? '');
        this.highlightedTaskId = taskId;
        this.expandSet.add(taskId);
        const scrollToPosition = 130 + this._tasks.findIndex((task) => task.id === taskId) * 71;
        setTimeout(() => window.scrollBy({ top: scrollToPosition, behavior: 'smooth' }), 0);
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

  async deleteTask(task: Task): Promise<void> {
    await this.tasksService.deleteTask(task);
    this.nzMessageService.success('Task deleted');
  }
}
