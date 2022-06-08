import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public loginService: LoginService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!await this.loginService.isLoggedIn()) {
      this.loginService.initializeForm();
    }
  }

}
