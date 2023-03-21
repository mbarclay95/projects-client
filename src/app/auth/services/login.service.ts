import { Injectable } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "./state/auth.service";
import {AuthStorageService} from "./auth-storage.service";
import {Router} from "@angular/router";
import {AuthQuery} from "./state/auth.query";
import {Roles} from "../permissions";
import {isMobile} from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginForm?: UntypedFormGroup;
  error = false;
  unauthorized = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private authStorageService: AuthStorageService,
    private router: Router,
  ) { }

  initializeForm(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    });
  }

  async login(): Promise<void> {
    if (!this.loginForm || this.loginForm.invalid) {
      this.error = true;
      return;
    }
    this.error = false;
    this.loading = true;
    this.unauthorized = false;

    try {
      await this.authService.login(this.loginForm.get('email')?.value ?? '', this.loginForm.get('password')?.value ?? '');
    } catch (e) {
      this.unauthorized = true;
      this.loading = false;
      return;
    }

    this.loading = false;
    await this.router.navigateByUrl(this.getRedirectUrl());
  }

  async isLoggedIn(): Promise<boolean> {
    if (!this.authStorageService.isTokenSet()) {
      return false;
    }

    try {
      await this.authService.getMe();
    } catch (e) {
      return false;
    }
    await this.router.navigateByUrl(this.getRedirectUrl());

    return true;
  }

  getRedirectUrl(): string {
    const me = this.authQuery.getUser();
    switch (me.userConfig.homePageRole) {
      case Roles.DASHBOARD_ROLE:
        return 'app/dashboard';
      case Roles.BACKUPS_ROLE:
        return 'app/backups?tab=backups';
      case Roles.EVENTS_ROLE:
        return 'app/events';
      case Roles.GOALS_ROLE:
        return 'app/goals';
      case Roles.TASKS_ROLE:
        return isMobile ? 'app/tasks/weekly-tasks' : 'app/tasks?tab=weekly-tasks';
      case Roles.USERS_ROLE:
        return 'app/users';
      case Roles.FILE_EXPLORER_ROLE:
        return 'app/file-explorer';
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.authStorageService.clearToken();
    await this.router.navigateByUrl('login');
  }

}
