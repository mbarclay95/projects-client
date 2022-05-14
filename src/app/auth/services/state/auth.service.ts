import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {AuthStore} from './auth.store';
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {AuthStorageService} from "../auth-storage.service";
import {createUser, User} from "../../../users/models/user.model";
import {UserConfig} from "../../../users/models/user-config.model";
import {AuthQuery} from "./auth.query";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private authStore: AuthStore,
    private authQuery: AuthQuery,
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) {
  }

  async login() {
    await firstValueFrom(this.http.post<{accessToken: string}>(`${environment.apiUrl}/login`, {
      username: 'mbarclay36',
      password: 'password'
    }).pipe(
      tap(token => this.authStorageService.setAuthToken(token.accessToken)),
      tap(() => this.getUser())
    ));
  }

  async getUser() {
    await firstValueFrom(this.http.get<User>(`${environment.apiUrl}/me`).pipe(
      map(user => createUser(user)),
      tap(user => this.authStore.update(user))
    ));
  }

  async updateUserConfig(userConfig: Partial<UserConfig>) {
    const user = this.authQuery.getUser();
    user.userConfig = {...user.userConfig, ...userConfig};
    await firstValueFrom(this.http.patch<User>(`${environment.apiUrl}/users/${user.id}`, user).pipe(
      map(user => createUser(user)),
      tap(user => this.authStore.update(user))
    ));
  }
}
