import { Component, effect, inject, signal } from '@angular/core';
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
  sideMenuClosed = signal(true);
  loading = signal(false);
  readonly isMobile = isMobile;
  readonly collapsedWidth = isMobile ? 0 : 64;
  menu = faBars;
  plus = faPlus;

  readonly authStore = inject(AuthSignalStore);
  readonly mobileHeaderService = inject(MobileDisplayService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      const user = this.authStore.auth();
      if (this.isMobile) {
        return;
      }
      if (user) {
        this.sideMenuClosed.set(!user.userConfig.sideMenuOpen);
      }
    });

    this.subscribeToRouter();
  }

  sideMenuChanged(closed: boolean, saveToServer = true) {
    this.sideMenuClosed.set(closed);
    this.authStore.updateUserConfig({ sideMenuOpen: !closed }, saveToServer);
  }

  subscribeToRouter() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading.set(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading.set(false);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  closeSideMenu(saveToServer = true) {
    this.sideMenuClosed.set(true);
    void this.authStore.updateUserConfig({ sideMenuOpen: false }, saveToServer);
  }

  closeSideIfMobile() {
    if (this.isMobile && !this.sideMenuClosed()) {
      this.sideMenuClosed.set(true);
    }
  }
}

export const isMobile = window.matchMedia('(max-width: 900px)').matches;
