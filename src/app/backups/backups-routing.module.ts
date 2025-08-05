import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackupsResolver } from './backups.resolver';
import { BackupTabsComponent } from './pages/backup-tabs/backup-tabs.component';

const routes: Routes = [
  {
    path: '',
    resolve: { BackupsResolver },
    children: [
      {
        path: '',
        component: BackupTabsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackupsRoutingModule {}
