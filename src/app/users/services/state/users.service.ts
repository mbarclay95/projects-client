import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createUser, TaskUserConfig, User} from '../../models/user.model';
import { UsersStore } from './users.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../environments/environment";
import {UsersQuery} from "./users.query";

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(
    private usersStore: UsersStore,
    private http: HttpClient,
    private usersQuery: UsersQuery,
  ) {
  }

  async getUsers(): Promise<void> {
    await firstValueFrom(this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map(users => users.map(user => createUser(user))),
      tap(users => this.usersStore.set(users))
    ));
  }

  async updateUser(userId: number, newUser: User): Promise<void> {
    // const newUser = {...this.usersQuery.getEntity(userId), ...user};
    await firstValueFrom(this.http.put<User>(`${environment.apiUrl}/users/${userId}`, newUser).pipe(
      map(user => createUser(user)),
      tap(user => this.usersStore.update(user.id, user))
    ));
  }

  async updateTaskUserConfig(user: User, taskUserConfig: TaskUserConfig): Promise<void> {
    await firstValueFrom(this.http.put<TaskUserConfig>(`${environment.apiUrl}/task-user-config/${taskUserConfig.id}`, taskUserConfig).pipe(
      map(taskUserConfig => {
        return {...user, taskUserConfig};
      }),
      tap(user => this.usersStore.update(user.id, user))
    ));
  }

  async createUser(user: User): Promise<void> {
    await firstValueFrom(this.http.post<User>(`${environment.apiUrl}/users`, user).pipe(
      map(user => createUser(user)),
      tap(user => this.usersStore.add(user))
    ));
  }
}
