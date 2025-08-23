import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackupTabsComponent } from './pages/backup-tabs/backup-tabs.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackupsRoutingModule {}
