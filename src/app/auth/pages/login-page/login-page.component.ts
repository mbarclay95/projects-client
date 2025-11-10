import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthSignalStore } from '../../services/auth-signal-store';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [ReactiveFormsModule, NzInputDirective, NzButtonComponent, NzSpinComponent],
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
