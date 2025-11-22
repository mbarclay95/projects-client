import { TypedRoute } from '../app.routes';
import { checkConfigGuard } from './check-config.guard';
import { IncompleteEntriesComponent } from './pages/incomplete-entries/incomplete-entries.component';
import { IncorrectConfigComponent } from './pages/incorrect-config/incorrect-config.component';

export const MONEY_ROUTES: TypedRoute[] = [
  {
    path: '',
    canActivateChild: [checkConfigGuard],
    children: [
      { path: '', redirectTo: 'incomplete-transactions', pathMatch: 'full' },
      {
        path: 'incomplete-transactions',
        component: IncompleteEntriesComponent,
        data: { headerTitle: 'Incomplete Transactions', createButtonAction: 'transactions' },
      },
    ],
  },
  {
    path: 'incorrect-config',
    component: IncorrectConfigComponent,
    data: { headerTitle: 'Incorrect Configuration' },
  },
];
