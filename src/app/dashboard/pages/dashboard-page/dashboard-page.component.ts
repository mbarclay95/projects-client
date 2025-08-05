import { Component } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FoldersService } from '../../services/folder/state/folders.service';
import { UptimeKumaService } from '../../services/uptime-kuma.service';
import { AuthQuery } from '../../../auth/services/state/auth.query';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: false,
})
export class DashboardPageComponent {
  edit = faEdit;
  showUptimeKuma$ = this.authQuery.showUptimeKuma$.pipe(tap((show) => this.initUptimeKuma(show)));

  constructor(
    public foldersService: FoldersService,
    public uptimeKumaService: UptimeKumaService,
    private authQuery: AuthQuery,
  ) {}

  initUptimeKuma(show: boolean): void {
    show ? this.uptimeKumaService.initSocket() : this.uptimeKumaService.disconnectSocket();
  }
}
