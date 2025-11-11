import { TypedRoute } from '../app.routes';
import { tryAuthGuard } from './services/try-auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './services/auth.guard';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

export const AUTH_ROUTES: TypedRoute[] = [
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
