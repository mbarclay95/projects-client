import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskTabsComponent} from "./pages/task-tabs/task-tabs.component";
import {TasksResolver} from "./tasks.resolver";

const routes: Routes = [
  {
    path: '', resolve: {TasksResolver}, children: [
      {path: '', component: TaskTabsComponent, }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
