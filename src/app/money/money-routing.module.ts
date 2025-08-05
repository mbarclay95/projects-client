import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncompleteEntriesComponent } from './pages/incomplete-entries/incomplete-entries.component';
import { MobileHeaderResolver } from '../mobile-header.resolver';
import { MoneyResolver } from './money.resolver';
import { IncorrectConfigComponent } from './pages/incorrect-config/incorrect-config.component';

const routes: Routes = [
  {
    path: '',
    resolve: { MoneyResolver },
    children: [
      { path: '', redirectTo: 'incomplete-transactions', pathMatch: 'full' },
      {
        path: 'incomplete-transactions',
        component: IncompleteEntriesComponent,
        resolve: { MobileHeaderResolver },
        data: { headerTitle: 'Incomplete Transactions' },
      },
    ],
  },
  {
    path: 'incorrect-config',
    component: IncorrectConfigComponent,
    resolve: { MobileHeaderResolver },
    data: { headerTitle: 'Incorrect Configuration' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyRoutingModule {}
