import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CreateEditFolderModalComponent } from './components/create-edit-folder-modal/create-edit-folder-modal.component';
import { CreateEditSiteModalComponent } from './components/create-edit-site-modal/create-edit-site-modal.component';
import { FolderComponent } from './components/folder/folder.component';
import { FolderGridComponent } from './components/folder-grid/folder-grid.component';
import { SiteComponent } from './components/site/site.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardPageComponent,
    CreateEditFolderModalComponent,
    CreateEditSiteModalComponent,
    FolderComponent,
    FolderGridComponent,
    SiteComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    FontAwesomeModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzModalModule,
    NzUploadModule,
    NzSelectModule,
    DragDropModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzSwitchModule,
    NgOptimizedImage,
    NzSpinComponent,
  ],
})
export class DashboardModule {}
