import { Component, effect, inject } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UptimeKumaService } from '../../services/uptime-kuma.service';
import { FolderSignalStore } from '../../services/folder-signal-store';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: false,
})
export class DashboardPageComponent {
  edit = faEdit;

  readonly authStore = inject(AuthSignalStore);
  readonly folderStore = inject(FolderSignalStore);

  constructor(public uptimeKumaService: UptimeKumaService) {
    effect(() => {
      this.initUptimeKuma(this.authStore.showUptimeKuma());
    });
  }

  initUptimeKuma(show: boolean): void {
    show ? this.uptimeKumaService.initSocket() : this.uptimeKumaService.disconnectSocket();
  }
}
