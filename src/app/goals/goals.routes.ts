import { TypedRoute } from '../app.routes';
import { ListGoalsPageComponent } from './pages/list-goals-page/list-goals-page.component';

export const GOALS_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListGoalsPageComponent,
      },
    ],
  },
];
