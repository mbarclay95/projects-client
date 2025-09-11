import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyRoutingModule } from './money-routing.module';
import { MoneyLayoutComponent } from './money-layout/money-layout.component';
import { IncompleteEntriesComponent } from './pages/incomplete-entries/incomplete-entries.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IncorrectConfigComponent } from './pages/incorrect-config/incorrect-config.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { EntryRowsComponent } from './components/entry-rows/entry-rows.component';
import { EntryRowItemComponent } from './components/entry-row-item/entry-row-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CreateEditEntryModalComponent } from './components/create-edit-entry-modal/create-edit-entry-modal.component';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    MoneyLayoutComponent,
    IncompleteEntriesComponent,
    IncorrectConfigComponent,
    EntryRowsComponent,
    EntryRowItemComponent,
    CreateEditEntryModalComponent,
  ],
  imports: [
    CommonModule,
    MoneyRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    FontAwesomeModule,
    NzEmptyModule,
    NzDividerModule,
    FormsModule,
    NzCheckboxModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzUploadModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzSpinComponent,
  ],
})
export class MoneyModule {}
