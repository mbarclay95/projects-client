import { TypedRoute } from '../app.routes';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const DASHBOARD_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: DashboardPageComponent }],
  },
];
