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
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [NzSpinComponent, FolderGridComponent, NzButtonComponent, FaIconComponent, AsyncPipe, NzModalModule],
})
export class DashboardPageComponent {
  uptimeKumaService = inject(UptimeKumaService);

  edit = faEdit;

  readonly authStore = inject(AuthSignalStore);
  readonly folderStore = inject(FolderSignalStore);

  constructor() {
    effect(() => {
      if (this.authStore.showUptimeKuma()) {
        this.uptimeKumaService.initSocket();
      } else {
        this.uptimeKumaService.disconnectSocket();
      }
    });
  }
}
