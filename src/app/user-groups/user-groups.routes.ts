import { TypedRoute } from '../app.routes';
import { UserGroupsPageComponent } from './pages/user-groups-page/user-groups-page.component';

export const USER_GROUPS_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: UserGroupsPageComponent, data: { createButtonAction: 'user-groups' } }],
  },
];
