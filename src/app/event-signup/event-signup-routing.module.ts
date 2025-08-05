import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { EventSignupResolver } from './event-signup.resolver';

const routes: Routes = [
  { path: '', component: NotFoundPageComponent },
  { path: 'signup/:eventId', component: EventPageComponent, resolve: { EventSignupResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventSignupRoutingModule {}
