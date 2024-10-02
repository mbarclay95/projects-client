import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {gamingResolver} from './gaming.resolver';
import {GamingSessionsPageComponent} from './pages/gaming-sessions-page/gaming-sessions-page.component';

const routes: Routes = [
  {
    path: '', resolve: {gamingResolver}, children: [
      {path: '', component: GamingSessionsPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamingRoutingModule { }
