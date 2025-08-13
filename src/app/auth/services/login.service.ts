import { inject, Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../permissions';
import { isMobile } from '../../app.component';
import { AuthSignalStore } from './auth-signal-store';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginForm?: UntypedFormGroup;
  loading = false;

  readonly authStore = inject(AuthSignalStore);

  constructor(private router: Router) {}

  initializeForm(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  async login(): Promise<void> {
    if (!this.loginForm || this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const loginSuccess = await this.authStore.login(this.loginForm.get('email')?.value ?? '', this.loginForm.get('password')?.value ?? '');
    if (!loginSuccess) {
      this.loading = false;
      return;
    }

    await this.authStore.getMe();

    this.loading = false;
    await this.redirectIfLoggedIn();
  }

  async redirectIfLoggedIn(): Promise<boolean> {
    if (this.authStore.isLoggedIn()) {
      // lazy loading was failing without waiting a second. AI recommended and it works...
      await new Promise((res) => setTimeout(res, 50));
      await this.router.navigate([this.getRedirectUrl()]);
      return true;
    }

    return false;
  }

  getRedirectUrl(): string {
    const me = this.authStore.auth();
    if (!me) {
      throw Error('Auth not initialized');
    }
    switch (me.userConfig.homePageRole) {
      case null:
        return '/my-profile';
      case Roles.DASHBOARD_ROLE:
        return '/app/dashboard';
      case Roles.BACKUPS_ROLE:
        return '/app/backups?tab=backups';
      case Roles.EVENTS_ROLE:
        return '/app/events';
      case Roles.GOALS_ROLE:
        return '/app/goals';
      case Roles.TASKS_ROLE:
        return isMobile ? '/app/tasks/weekly-tasks' : '/app/tasks?tab=weekly-tasks';
      case Roles.FILE_EXPLORER_ROLE:
        return '/app/file-explorer';
      case Roles.MONEY_APP_ROLE:
        return '/app/money';
    }
    throw new Error('Un-configured role set to homepage');
  }
}
