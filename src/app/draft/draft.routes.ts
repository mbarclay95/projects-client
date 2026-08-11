import { TypedRoute } from '../app.routes';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DraftPageComponent } from './pages/draft-page/draft-page.component';
import { DraftResolver } from './draft.resolver';

export const DRAFT_ROUTES: TypedRoute[] = [
  { path: '', component: NotFoundPageComponent },
  { path: ':draftId', component: DraftPageComponent, resolve: { DraftResolver } },
];
