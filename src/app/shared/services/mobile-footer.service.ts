import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultTaskButtons, FooterButton, taskFamiliesButton } from '../models/footer-button.model';
import { isMobile } from '../../app.component';
import { Permissions } from '../../auth/permissions';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';

@Injectable({
  providedIn: 'root',
})
export class MobileFooterService {
  private footerButtonsSubject: BehaviorSubject<FooterButton[]> = new BehaviorSubject<FooterButton[]>([]);
  footerButtons$: Observable<FooterButton[]> = this.footerButtonsSubject.asObservable();

  private authStore = inject(AuthSignalStore);

  setFooterButtonsForTasksPage(): void {
    if (isMobile) {
      const footerButtons = [...defaultTaskButtons];
      if (this.authStore.hasPermissionTo(Permissions.FAMILIES_TAB)) {
        footerButtons.push({ ...taskFamiliesButton });
      }
      this.setFooterButtons(footerButtons);
    }
  }

  clearFooterButtons(): void {
    this.footerButtonsSubject.next([]);
  }

  private setFooterButtons(footerButtons: FooterButton[]): void {
    this.footerButtonsSubject.next(footerButtons);
  }
}
