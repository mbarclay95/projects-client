import { Component } from '@angular/core';
import {AuthQuery} from "./auth/services/state/auth.query";
import {PermissionsService} from "./auth/services/permissions.service";
import {AuthService} from "./auth/services/state/auth.service";
import {filter, take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projects-client';
  sideMenuClosed?: boolean = undefined;
  collapsedWidth = screen.width > 600 ? 64 : 0;

  constructor(
    public authQuery: AuthQuery,
    public authService: AuthService,
    public permissionsService: PermissionsService,
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
}
