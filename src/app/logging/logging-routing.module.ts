import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggingPageComponent } from './pages/logging-page/logging-page.component';
import { LoggingResolver } from './logging.resolver';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  {
    path: '',
    resolve: { LoggingResolver },
    children: [{ path: '', component: LoggingPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggingRoutingModule {}
