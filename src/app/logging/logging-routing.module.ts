import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggingPageComponent } from './pages/logging-page/logging-page.component';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: LoggingPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggingRoutingModule {}
