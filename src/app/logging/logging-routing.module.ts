import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggingPageComponent} from './pages/logging-page/logging-page.component';
import {LoggingResolver} from './logging.resolver';

const routes: Routes = [
  {
    path: '', resolve: {LoggingResolver}, children: [
      {path: '', component: LoggingPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggingRoutingModule {
}
