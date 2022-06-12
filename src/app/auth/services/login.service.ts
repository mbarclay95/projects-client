import { Injectable } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "./state/auth.service";
import {AuthStorageService} from "./auth-storage.service";
import {Router} from "@angular/router";

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
    await this.router.navigateByUrl('app/dashboard');
  }

  async isLoggedIn(): Promise<boolean> {
    if (!this.authStorageService.isTokenSet()) {
      return false;
    }

    try {
      await this.authService.getMe();
    } catch (e) {
      this.authStorageService.clearToken();
      return false;
    }

    await this.router.navigateByUrl('app/dashboard');

    return true;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigateByUrl('login');
  }

}
