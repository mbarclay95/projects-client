import { TypedRoute } from '../app.routes';
import { EventsPageComponent } from './pages/events-page/events-page.component';

export const EVENTS_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: EventsPageComponent }],
  },
];
