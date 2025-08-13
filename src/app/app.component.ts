import { Component, effect, inject } from '@angular/core';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MobileHeaderService } from './shared/services/mobile-header.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthSignalStore } from './auth/services/auth-signal-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'projects-client';
  sideMenuClosed?: boolean = undefined;
  isMobile = isMobile;
  collapsedWidth = isMobile ? 0 : 64;
  menu = faBars;
  plus = faPlus;
  loading = false;

  readonly authStore = inject(AuthSignalStore);

  constructor(
    public mobileHeaderService: MobileHeaderService,
    private router: Router,
  ) {
    effect(() => {
      if (this.isMobile) {
        stop();
      }
      const user = this.authStore.auth();
      if (user) {
        this.sideMenuClosed = false;
        if (!user.userConfig.sideMenuOpen) {
          setTimeout(() => {
            this.sideMenuClosed = true;
          }, 0);
        }
        stop();
      }
    });
    if (this.isMobile) {
      this.sideMenuClosed = true;
    }
    this.subscribeToRouter();
  }

  subscribeToRouter() {
    this.router.events.subscribe((event) => {
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

  closeSideMenu(saveToServer = true) {
    this.sideMenuClosed = true;
    void this.authStore.updateUserConfig({ sideMenuOpen: false }, saveToServer);
  }

  closeSideIfMobile() {
    if (this.isMobile && !this.sideMenuClosed) {
      this.sideMenuClosed = true;
    }
  }
}

export const isMobile = screen.width < 900;
