import { TypedRoute } from '../app.routes';
import { GamingSessionsPageComponent } from './pages/gaming-sessions-page/gaming-sessions-page.component';
import { guestGamingResolver } from './guest-gaming.resolver';
import { viewSessionResolver } from './view-session.resolver';
import { GamingSessionViewPageComponent } from './pages/gaming-session-view-page/gaming-session-view-page.component';
import { authGuard } from '../auth/services/auth.guard';
import { Permissions } from '../auth/permissions';
import { GamingSessionsAdminPageComponent } from './pages/gaming-sessions-admin-page/gaming-sessions-admin-page.component';

export const GAMING_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GamingSessionsPageComponent,
        resolve: { guestGamingResolver },
        data: { createButtonAction: 'gaming-sessions' },
      },
      {
        path: 'session/:id',
        resolve: { viewSessionResolver, guestGamingResolver },
        component: GamingSessionViewPageComponent,
      },
      {
        path: 'admin',
        canActivate: [authGuard],
        data: { permission: Permissions.GAMING_SESSIONS_ADMIN_PAGE, createButtonAction: 'gaming-sessions' },
        component: GamingSessionsAdminPageComponent,
      },
    ],
  },
];
