import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IncompleteEntriesComponent } from './pages/incomplete-entries/incomplete-entries.component';
import { IncorrectConfigComponent } from './pages/incorrect-config/incorrect-config.component';
import { TypedRoute } from '../app-routing.module';
import { checkConfigGuard } from './check-config.guard';

const routes: TypedRoute[] = [
  {
    path: '',
    canActivateChild: [checkConfigGuard],
    children: [
      { path: '', redirectTo: 'incomplete-transactions', pathMatch: 'full' },
      {
        path: 'incomplete-transactions',
        component: IncompleteEntriesComponent,
        data: { headerTitle: 'Incomplete Transactions' },
      },
    ],
  },
  {
    path: 'incorrect-config',
    component: IncorrectConfigComponent,
    data: { headerTitle: 'Incorrect Configuration' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyRoutingModule {}
