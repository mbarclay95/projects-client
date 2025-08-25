import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoalsResolver } from './goals.resolver';
import { ListGoalsPageComponent } from './pages/list-goals-page/list-goals-page.component';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  {
    path: '',
    resolve: { GoalsResolver },
    children: [
      {
        path: '',
        component: ListGoalsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsRoutingModule {}
