import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {MobileHeaderService} from "../../../shared/services/mobile-header.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    private mobileHeaderService: MobileHeaderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.mobileHeaderService.setTitle('Login');
    this.mobileHeaderService.hideCreateButton();
    if (!await this.loginService.isLoggedIn()) {
      this.loginService.initializeForm();
    }
  }

}
