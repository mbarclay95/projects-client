import { Component, effect, inject } from '@angular/core';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MobileDisplayService } from './shared/services/mobile-display.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthSignalStore } from './auth/services/auth-signal-store';
import { NzLayoutComponent, NzHeaderComponent, NzSiderComponent, NzContentComponent, NzFooterComponent } from 'ng-zorro-antd/layout';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { MobileFooterComponent } from './shared/components/mobile-footer/mobile-footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    FaIconComponent,
    NzSiderComponent,
    SideMenuComponent,
    NzContentComponent,
    NzSpinComponent,
    RouterOutlet,
    NzFooterComponent,
    MobileFooterComponent,
  ],
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
    public mobileHeaderService: MobileDisplayService,
    private router: Router,
  ) {
    effect(() => {
      if (this.isMobile || this.sideMenuClosed !== undefined) {
        return;
      }
      const user = this.authStore.auth();
      if (user) {
        this.sideMenuClosed = false;
        if (!user.userConfig.sideMenuOpen) {
          setTimeout(() => {
            this.sideMenuClosed = true;
          }, 0);
        }
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

export const isMobile = window.matchMedia('(max-width: 900px)').matches;
