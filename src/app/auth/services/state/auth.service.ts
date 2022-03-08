import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {AuthStore, createAuth} from './auth.store';
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {AuthStorageService} from "../auth-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private authStore: AuthStore,
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) {
  }

  async login() {
    await firstValueFrom(this.http.post<{accessToken: string}>(`${environment.apiUrl}/login`, {
      username: 'mbarclay36',
      password: 'password'
    }).pipe(
      tap(token => this.authStorageService.setAuthToken(token.accessToken))
    ));
  }

  async getUser() {
    await firstValueFrom(this.http.get(`${environment.apiUrl}/me`).pipe(
      map(user => createAuth(user)),
      tap(user => this.authStore.update(user))
    ));
  }


}
