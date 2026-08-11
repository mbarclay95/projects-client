import { TypedRoute } from '../app.routes';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

// `:draftId` lands in stage 4.11, alongside DraftPageComponent — wiring a
// route to a controller that doesn't exist yet is a worse diff to review
// than adding it once its component lands.
export const DRAFT_ROUTES: TypedRoute[] = [{ path: '', component: NotFoundPageComponent }];
