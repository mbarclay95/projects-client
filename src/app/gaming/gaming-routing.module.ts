import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GamingSessionsPageComponent } from './pages/gaming-sessions-page/gaming-sessions-page.component';
import { GamingSessionsAdminPageComponent } from './pages/gaming-sessions-admin-page/gaming-sessions-admin-page.component';
import { Permissions } from '../auth/permissions';
import { GamingSessionViewPageComponent } from './pages/gaming-session-view-page/gaming-session-view-page.component';
import { viewSessionResolver } from './view-session.resolver';
import { guestGamingResolver } from './guest-gaming.resolver';
import { authGuard } from '../auth/services/auth.guard';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamingRoutingModule {}
