import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileExplorerRoutingModule } from './file-explorer-routing.module';
import { FileExplorerLayoutComponent } from './file-explorer-layout/file-explorer-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FileExplorerPageComponent } from './pages/file-explorer-page/file-explorer-page.component';
import { DirectoriesFilesListComponent } from './components/directories-files-list/directories-files-list.component';
import { SharedModule } from '../shared/shared.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateEditDirectoryItemModalComponent } from './components/create-edit-directory-item-modal/create-edit-directory-item-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@NgModule({
  imports: [
    CommonModule,
    FileExplorerRoutingModule,
    NzLayoutModule,
    SharedModule,
    NzListModule,
    FontAwesomeModule,
    NzModalModule,
    NzInputModule,
    FormsModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzRadioModule,
    FileExplorerLayoutComponent,
    FileExplorerPageComponent,
    DirectoriesFilesListComponent,
    CreateEditDirectoryItemModalComponent,
  ],
})
export class FileExplorerModule {}
