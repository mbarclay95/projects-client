import { TypedRoute } from '../app.routes';
import { BackupTabsComponent } from './pages/backup-tabs/backup-tabs.component';

export const BACKUPS_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BackupTabsComponent,
      },
    ],
  },
];
