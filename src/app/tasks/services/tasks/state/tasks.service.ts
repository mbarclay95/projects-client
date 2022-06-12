import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createTask, Task} from '../../../models/task.model';
import {TasksStore, TaskUiState} from './tasks.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {TasksQuery} from "./tasks.query";

@Injectable({providedIn: 'root'})
export class TasksService {

  constructor(
    private tasksStore: TasksStore,
    private http: HttpClient,
    private tasksQuery: TasksQuery,
  ) {
  }

  async getTasks(queryString: string): Promise<void> {
    await firstValueFrom(this.http.get<Task[]>(`${environment.apiUrl}/tasks?${queryString}`).pipe(
      map(tasks => tasks.map(task => createTask(task))),
      tap(tasks => this.tasksStore.set(tasks))
    ));
  }

  async createNewTask(task: Task): Promise<void> {
    await firstValueFrom(this.http.post<Task>(`${environment.apiUrl}/tasks`, task).pipe(
      map(task => createTask(task)),
      tap(task => this.tasksStore.add(task))
    ));
  }

  async updateTask(taskId: number, task: Partial<Task>, removeFromList = false) {
    const newTask = {...this.tasksQuery.getEntity(taskId), ...task};
    await firstValueFrom(this.http.put<Task>(`${environment.apiUrl}/tasks/${taskId}`, newTask).pipe(
      map(task => createTask(task)),
      tap(task => {
        if (removeFromList) {
          this.tasksStore.remove(taskId);
        } else {
          this.tasksStore.update(taskId, task);
        }
      })
    ));
  }

  updateUi(newState: Partial<TaskUiState>): void {
    const newUi = {...this.tasksQuery.getUi(), ...newState};
    this.tasksStore.update({ui: newUi});
    this.getTasks(this.tasksQuery.getQueryString(newUi));
  }
}
