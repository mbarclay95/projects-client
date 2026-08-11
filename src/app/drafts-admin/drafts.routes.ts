import { TypedRoute } from '../app.routes';
import { DraftsPageComponent } from './pages/drafts-page/drafts-page.component';
import { DraftDetailPageComponent } from './pages/draft-detail-page/draft-detail-page.component';

export const DRAFTS_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [
      { path: '', component: DraftsPageComponent },
      { path: ':draftId', component: DraftDetailPageComponent },
    ],
  },
];
