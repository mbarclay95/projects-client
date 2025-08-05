import {Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "./state/auth.service";
import {AuthStorageService} from "./auth-storage.service";
import {Router} from "@angular/router";
import {AuthQuery} from "./state/auth.query";
import {Roles} from "../permissions";
import {isMobile} from '../../app.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginForm?: UntypedFormGroup;
  loading = false;

  badCredsError = false;
  expiredTokenError = false;
  otherError = false;

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
      return;
    }
    this.loading = true;
    this.badCredsError = false;
    this.expiredTokenError = false;

    try {
      await this.authService.login(this.loginForm.get('email')?.value ?? '', this.loginForm.get('password')?.value ?? '');
    } catch (e: unknown) {
      this.handleUnAuthorizedErrors(e as HttpErrorResponse);
      this.loading = false;
      return;
    }

    try {
      await this.authService.getMe();
    } catch (e: unknown) {
      this.handleUnAuthorizedErrors(e as HttpErrorResponse);
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
    } catch (e: unknown) {
      this.handleUnAuthorizedErrors(e as HttpErrorResponse);
      return false;
    }
    await this.router.navigateByUrl(this.getRedirectUrl());

    return true;
  }

  handleUnAuthorizedErrors(error: HttpErrorResponse): void {
    switch (error.error.message) {
      case 'Unauthenticated.':
        this.expiredTokenError = true;
        break;
      case 'Bad credentials':
        this.badCredsError = true;
        break;
      default:
        this.otherError = true;
    }
  }

  getRedirectUrl(): string {
    const me = this.authQuery.getUser();
    switch (me.userConfig.homePageRole) {
      case null:
        return 'my-profile';
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
      case Roles.FILE_EXPLORER_ROLE:
        return 'app/file-explorer';
      case Roles.MONEY_APP_ROLE:
        return 'app/money';
    }
    throw new Error('Un-configured role set to homepage')
  }
}
