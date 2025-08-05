import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { UserTableComponent } from './components/user-table/user-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreateEditUserModalComponent } from './components/create-edit-user-modal/create-edit-user-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RolesToIdsPipe } from './pipes/roles-to-ids.pipe';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersPageComponent, UsersLayoutComponent, UserTableComponent, CreateEditUserModalComponent, RolesToIdsPipe],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzLayoutModule,
    NzTableModule,
    NzButtonModule,
    FontAwesomeModule,
    NzIconModule,
    NzModalModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    SharedModule,
  ],
})
export class UsersModule {}
