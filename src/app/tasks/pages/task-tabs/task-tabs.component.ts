import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {createFamily, Family} from "../../models/family.model";
import {createTask, Task} from "../../models/task.model";
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {PermissionsService} from "../../../auth/services/permissions.service";

@Component({
  selector: 'app-task-tabs',
  templateUrl: './task-tabs.component.html',
  styleUrls: ['./task-tabs.component.scss']
})
export class TaskTabsComponent implements OnInit {
  selectedTab: 'Task' | 'Recurring Task' | 'Family' = 'Task';
  openFamilyModal: Subject<Family> = new Subject<Family>();
  openTaskModal: Subject<Task> = new Subject<Task>();

  constructor(
    private authQuery: AuthQuery,
    public permissionsService: PermissionsService
  ) { }

  ngOnInit(): void {
  }

  createEntity() {
    switch (this.selectedTab) {
      case "Recurring Task":
        break;
      case "Family":
        this.openFamilyModal.next(createFamily({id: 0}));
        break;
      case "Task":
        this.openTaskModal.next(createTask({id: 0, ownerType: 'user', ownerId: this.authQuery.getUser().id}));
        break;
    }
  }
}
