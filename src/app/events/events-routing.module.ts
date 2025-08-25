import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: EventsPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
