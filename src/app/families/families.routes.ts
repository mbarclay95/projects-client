import { TypedRoute } from '../app.routes';
import { FamiliesPageComponent } from './pages/families-page/families-page.component';

export const FAMILIES_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: FamiliesPageComponent, data: { createButtonAction: 'families' } }],
  },
];
