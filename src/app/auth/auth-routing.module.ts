import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MobileHeaderResolver } from '../mobile-header.resolver';
import { AuthResolver } from './auth.resolver';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
    resolve: { MobileHeaderResolver },
    data: { headerTitle: 'Login' },
  },
  {
    path: 'my-profile',
    canActivate: [authGuard],
    component: MyProfileComponent,
    resolve: { MobileHeaderResolver, AuthResolver },
    data: { headerTitle: 'My Profile' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
