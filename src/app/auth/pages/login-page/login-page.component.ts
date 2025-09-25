import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthSignalStore } from '../../services/auth-signal-store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false,
})
export class LoginPageComponent implements OnInit {
  readonly authStore = inject(AuthSignalStore);

  constructor(public loginService: LoginService) {}

  async ngOnInit(): Promise<void> {
    if (!(await this.loginService.redirectIfLoggedIn())) {
      this.loginService.initializeForm();
    }
  }
}
