import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsResolver } from './goals.resolver';
import { ListGoalsPageComponent } from './pages/list-goals-page/list-goals-page.component';

const routes: Routes = [
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
