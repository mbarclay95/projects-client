import { Component } from '@angular/core';
import {AuthQuery} from "./auth/services/state/auth.query";
import {PermissionsService} from "./auth/services/permissions.service";
import {AuthService} from "./auth/services/state/auth.service";
import {filter, take} from "rxjs";
import {faBars, faPlus} from "@fortawesome/free-solid-svg-icons";
import {MobileHeaderService} from "./shared/services/mobile-header.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projects-client';
  sideMenuClosed?: boolean = undefined;
  isMobile = screen.width < 600;
  collapsedWidth = screen.width > 600 ? 64 : 0;
  menu = faBars;
  plus = faPlus;

  constructor(
    public authQuery: AuthQuery,
    public authService: AuthService,
    public permissionsService: PermissionsService,
    public mobileHeaderService: MobileHeaderService
  ) {
    this.getStartSideMenu();
  }

  getStartSideMenu() {
    this.authQuery.auth$.pipe(
      filter(user => !!user.id),
      take(1)
    ).subscribe(user => {
      this.sideMenuClosed = false;
      if (!user.userConfig.sideMenuOpen) {
        setTimeout(() => {
          this.sideMenuClosed = true;
        },0);
      }
    });
  }

  closeSideMenu() {
    this.sideMenuClosed = true;
    this.authService.updateUserConfig({sideMenuOpen: false});
  }
}
