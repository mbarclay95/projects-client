import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {MyProfileComponent} from "./pages/my-profile/my-profile.component";
import {AuthGuard} from "./services/auth.guard";
import {MobileHeaderResolver} from "../mobile-header.resolver";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginPageComponent,
    resolve: {MobileHeaderResolver},
    data: {headerTitle: 'Login'}
  },
  {
    path: 'my-profile',
    canActivate: [AuthGuard],
    component: MyProfileComponent,
    resolve: {MobileHeaderResolver},
    data: {headerTitle: 'My Profile'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
