import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsResolver } from './events.resolver';
import { EventsPageComponent } from './pages/events-page/events-page.component';

const routes: Routes = [
  {
    path: '',
    resolve: { EventsResolver },
    children: [{ path: '', component: EventsPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
