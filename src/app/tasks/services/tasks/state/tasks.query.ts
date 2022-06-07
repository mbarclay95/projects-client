import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TasksStore, TasksState } from './tasks.store';
import {Observable} from "rxjs";
import {Task} from "../../../models/task.model";

@Injectable({ providedIn: 'root' })
export class TasksQuery extends QueryEntity<TasksState> {
  tasks$: Observable<Task[]> = this.selectAll();

  constructor(
    protected override store: TasksStore
  ) {
    super(store);
  }

}
