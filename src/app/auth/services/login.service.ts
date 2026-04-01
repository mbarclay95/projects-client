import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../permissions';
import { isMobile } from '../../app.component';
import { AuthSignalStore } from './auth-signal-store';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private router = inject(Router);

  loginForm: WritableSignal<UntypedFormGroup | undefined> = signal(undefined);
  loading: WritableSignal<boolean> = signal(false);

  readonly authStore = inject(AuthSignalStore);

  initializeForm(): void {
    this.loginForm.set(
      new UntypedFormGroup({
        email: new UntypedFormControl('', [Validators.required]),
        password: new UntypedFormControl('', [Validators.required]),
      }),
    );
  }

  async login(): Promise<void> {
    const form = this.loginForm();
    if (!form || form.invalid) {
      return;
    }
    this.loading.set(true);

    const loginSuccess = await this.authStore.login(form.get('email')?.value ?? '', form.get('password')?.value ?? '');
    if (!loginSuccess) {
      this.loading.set(false);
      return;
    }

    await this.authStore.getMe();

    this.loading.set(false);
    await this.redirectIfLoggedIn();
  }

  async redirectIfLoggedIn(): Promise<boolean> {
    if (this.authStore.isLoggedIn()) {
      // lazy loading was failing without waiting a second. AI recommended and it works...
      await new Promise((res) => setTimeout(res, 50));
      await this.redirectToHomePage();
      return true;
    }

    return false;
  }

  private async redirectToHomePage(): Promise<void> {
    const me = this.authStore.auth();
    if (!me) {
      throw Error('Auth not initialized');
    }
    switch (me.userConfig.homePageRole) {
      case null:
        await this.router.navigate(['/my-profile']);
        return;
      case Roles.DASHBOARD_ROLE:
        await this.router.navigate(['/app/dashboard']);
        return;
      case Roles.BACKUPS_ROLE:
        await this.router.navigate(['/app/backups'], { queryParams: { tab: 'backups' } });
        return;
      case Roles.EVENTS_ROLE:
        await this.router.navigate(['/app/events']);
        return;
      case Roles.GOALS_ROLE:
        await this.router.navigate(['/app/goals']);
        return;
      case Roles.TASKS_ROLE:
        if (isMobile) {
          await this.router.navigate(['/app/tasks/weekly-tasks']);
        } else {
          await this.router.navigate(['/app/tasks'], { queryParams: { tab: 'weekly-tasks' } });
        }
        return;
      case Roles.FILE_EXPLORER_ROLE:
        await this.router.navigate(['/app/file-explorer']);
        return;
      case Roles.MONEY_APP_ROLE:
        await this.router.navigate(['/app/money']);
        return;
    }
    throw new Error('Un-configured role set to homepage');
  }
}
