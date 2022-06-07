import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createTask, Task} from '../../../models/task.model';
import {TasksStore} from './tasks.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class TasksService {

  constructor(
    private tasksStore: TasksStore,
    private http: HttpClient
  ) {
  }

  async getTasks(): Promise<void> {
    await firstValueFrom(this.http.get<Task[]>(`${environment.apiUrl}/tasks`).pipe(
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

  async updateTask(task: Task) {

  }
}
