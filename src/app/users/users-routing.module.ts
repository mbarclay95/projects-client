import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: UsersPageComponent, data: { createButtonAction: 'users' } }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
