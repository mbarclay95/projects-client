import { Component, effect, inject } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UptimeKumaService } from '../../services/uptime-kuma.service';
import { FolderSignalStore } from '../../services/folder-signal-store';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { FolderGridComponent } from '../../components/folder-grid/folder-grid.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [NzSpinComponent, FolderGridComponent, NzButtonComponent, FaIconComponent, AsyncPipe],
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
