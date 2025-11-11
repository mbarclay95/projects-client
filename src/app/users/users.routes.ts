import { TypedRoute } from '../app.routes';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const USERS_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: UsersPageComponent, data: { createButtonAction: 'users' } }],
  },
];
