import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {createFamily, Family} from "../../models/family.model";
import {createTask, Task} from "../../models/task.model";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {PermissionsService} from "../../../auth/services/permissions.service";
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {TaskUserConfigsService} from '../../services/task-user-configs/state/task-user-configs.service';

@Component({
  selector: 'app-task-tabs',
  templateUrl: './task-tabs.component.html',
  styleUrls: ['./task-tabs.component.scss']
})
export class TaskTabsComponent implements OnInit {
  selectedTab: 'Task' | 'Family' | 'My Family' = 'Task';
  openFamilyModal: Subject<Family> = new Subject<Family>();
  openTaskModal: Subject<Task> = new Subject<Task>();

  constructor(
    private authQuery: AuthQuery,
    public permissionsService: PermissionsService,
    public familiesQuery: FamiliesQuery,
    private tasksService: TasksService,
    private taskUserConfigsService: TaskUserConfigsService
  ) {
  }

  ngOnInit(): void {
    this.loadWeeklyTasks();
  }

  loadWeeklyTasks() {
    this.selectedTab = 'Task';
    this.tasksService.loadWeeklyTasksPage();
    this.taskUserConfigsService.resetWeekOffset();
  }

  loadTasksTable() {
    this.selectedTab = 'Task';
    this.tasksService.loadTasksPage();
    this.taskUserConfigsService.resetWeekOffset();
  }

  createEntity() {
    switch (this.selectedTab) {
      case "Family":
        this.openFamilyModal.next(createFamily({id: 0}));
        break;
      case "Task":
        this.openTaskModal.next(createTask({
          id: 0,
          ownerId: this.familiesQuery.activeId,
          taskPoint: this.familiesQuery.getMinTaskPoint()
        }));
        break;
    }
  }
}
