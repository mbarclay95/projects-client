import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {MobileHeaderService} from "../../../shared/services/mobile-header.service";
import {merge, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {createTask, Task} from "../../models/task.model";
import {isMobile} from '../../../app.component';
import {TaskUserConfigsQuery} from '../../services/task-user-configs/state/task-user-configs.query';
import {TaskUserConfigsService} from '../../services/task-user-configs/state/task-user-configs.service';

@Component({
  selector: 'app-weekly-tasks-page',
  templateUrl: './weekly-tasks-page.component.html',
  styleUrls: ['./weekly-tasks-page.component.scss']
})
export class WeeklyTasksPageComponent implements OnInit {
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() skipTask: EventEmitter<Task> = new EventEmitter<Task>();
  isMobile = isMobile;

  createEditTask: Observable<Task> = merge(
    this.mobileHeaderService.clickedButton$.pipe(
      map(() => createTask({ownerId: this.familiesQuery.activeId, taskPoint: this.familiesQuery.getMinTaskPoint()}))
    ),
    this.editTask.asObservable()
  );

  constructor(
    public familiesQuery: FamiliesQuery,
    public taskUserConfigsQuery: TaskUserConfigsQuery,
    public taskUserConfigsService: TaskUserConfigsService,
    public tasksQuery: TasksQuery,
    private tasksService: TasksService,
    private mobileHeaderService: MobileHeaderService
  ) {
  }

  ngOnInit(): void {
    if (this.isMobile) {
      this.tasksService.loadWeeklyTasksPage();
      this.taskUserConfigsService.resetWeekOffset();
    }
  }

}
