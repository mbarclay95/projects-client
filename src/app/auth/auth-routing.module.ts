import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { authGuard } from './services/auth.guard';
import { tryAuthGuard } from './services/try-auth.guard';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [tryAuthGuard],
    component: LoginPageComponent,
    data: { headerTitle: 'Login' },
  },
  {
    path: 'my-profile',
    canActivate: [authGuard],
    component: MyProfileComponent,
    data: { headerTitle: 'My Profile' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
