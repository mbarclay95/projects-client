import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersPageComponent} from "./pages/users-page/users-page.component";
import {UserResolver} from "./user.resolver";
import {MobileHeaderResolver} from '../mobile-header.resolver';

const routes: Routes = [
  {
    path: '', resolve: {UserResolver}, children: [
      {path: '', component: UsersPageComponent, resolve: {MobileHeaderResolver}, data: {showCreateButton: true}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
