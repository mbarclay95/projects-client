import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyRoutingModule } from './money-routing.module';
import { MoneyLayoutComponent } from './money-layout/money-layout.component';
import { IncompleteEntriesComponent } from './pages/incomplete-entries/incomplete-entries.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import { IncorrectConfigComponent } from './pages/incorrect-config/incorrect-config.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { EntryRowsComponent } from './components/entry-rows/entry-rows.component';
import { EntryRowItemComponent } from './components/entry-row-item/entry-row-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzDividerModule} from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [
    MoneyLayoutComponent,
    IncompleteEntriesComponent,
    IncorrectConfigComponent,
    EntryRowsComponent,
    EntryRowItemComponent
  ],
  imports: [
    CommonModule,
    MoneyRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    FontAwesomeModule,
    NzEmptyModule,
    NzDividerModule
  ]
})
export class MoneyModule { }
