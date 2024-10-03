import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {gamingResolver} from './gaming.resolver';
import {GamingSessionsPageComponent} from './pages/gaming-sessions-page/gaming-sessions-page.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {
  GamingSessionsAdminPageComponent
} from './pages/gaming-sessions-admin-page/gaming-sessions-admin-page.component';
import {Permissions} from '../auth/permissions';
import {MobileHeaderResolver} from '../mobile-header.resolver';

const routes: Routes = [
  {
    path: '', resolve: {gamingResolver}, children: [
      {path: '', component: GamingSessionsPageComponent},
      {
        path: 'admin',
        canActivate: [AuthGuard],
        resolve: {MobileHeaderResolver},
        data: {permission: Permissions.GAMING_SESSIONS_ADMIN_PAGE, showCreateButton: true},
        component: GamingSessionsAdminPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamingRoutingModule {
}
