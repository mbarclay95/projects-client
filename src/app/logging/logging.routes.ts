import { TypedRoute } from '../app.routes';
import { LoggingPageComponent } from './pages/logging-page/logging-page.component';

export const LOGGING_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: LoggingPageComponent }],
  },
];
