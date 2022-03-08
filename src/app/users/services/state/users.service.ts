import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createUser, User} from '../../models/user.model';
import { UsersStore } from './users.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(
    private usersStore: UsersStore,
    private http: HttpClient
  ) {
  }

  async getUsers() {
    await firstValueFrom(this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map(users => users.map(user => createUser(user))),
      tap(users => this.usersStore.set(users))
    ));
  }

}
