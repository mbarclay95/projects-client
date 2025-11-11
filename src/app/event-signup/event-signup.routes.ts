import { TypedRoute } from '../app.routes';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { EventSignupResolver } from './event-signup.resolver';

export const EVENT_SIGNUP_ROUTES: TypedRoute[] = [
  { path: '', component: NotFoundPageComponent },
  { path: 'signup/:eventId', component: EventPageComponent, resolve: { EventSignupResolver } },
];
