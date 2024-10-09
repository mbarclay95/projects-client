import { Component } from '@angular/core';
import {AuthQuery} from "./auth/services/state/auth.query";
import {PermissionsService} from "./auth/services/permissions.service";
import {AuthService} from "./auth/services/state/auth.service";
import {filter, take} from "rxjs";
import {faBars, faPlus} from "@fortawesome/free-solid-svg-icons";
import {MobileHeaderService} from "./shared/services/mobile-header.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projects-client';
  sideMenuClosed?: boolean = undefined;
  isMobile = isMobile;
  collapsedWidth = isMobile ? 0 : 64;
  menu = faBars;
  plus = faPlus;
  loading = true;

  constructor(
    public authQuery: AuthQuery,
    public authService: AuthService,
    public permissionsService: PermissionsService,
    public mobileHeaderService: MobileHeaderService,
    private router: Router
  ) {
    if (this.isMobile) {
        this.sideMenuClosed = true;
    } else {
        this.getStartSideMenu();
    }
    this.subscribeToRouter();
  }

  subscribeToRouter() {
    this.router.events.subscribe((event ) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
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

  closeSideMenu(saveToServer = true) {
    this.sideMenuClosed = true;
    void this.authService.updateUserConfig({sideMenuOpen: false}, saveToServer);
  }

  closeSideIfMobile() {
    if (this.isMobile && !this.sideMenuClosed) {
      this.sideMenuClosed = true;
    }
  }
}

export const isMobile = screen.width < 900;
