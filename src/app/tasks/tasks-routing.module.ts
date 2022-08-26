import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskTabsComponent} from "./pages/task-tabs/task-tabs.component";
import {TasksResolver} from "./tasks.resolver";
import {WeeklyTasksPageComponent} from "./pages/weekly-tasks-page/weekly-tasks-page.component";
import {MyFamilyPageComponent} from "./pages/my-family-page/my-family-page.component";
import {TasksPageComponent} from "./pages/tasks-page/tasks-page.component";
import {FamiliesPageComponent} from "./pages/families-page/families-page.component";
import {MobileHeaderResolver} from "../mobile-header.resolver";

const routes: Routes = [
  {
    path: '', resolve: {TasksResolver}, children: [
      {path: '', component: TaskTabsComponent},
      {
        path: 'weekly-tasks',
        resolve: {MobileHeaderResolver},
        data: {showCreateButton: true},
        component: WeeklyTasksPageComponent
      },
      {path: 'my-family', resolve: {MobileHeaderResolver}, component: MyFamilyPageComponent},
      {path: 'tasks', resolve: {MobileHeaderResolver}, data: {showCreateButton: true}, component: TasksPageComponent},
      {
        path: 'families',
        resolve: {MobileHeaderResolver},
        data: {showCreateButton: true},
        component: FamiliesPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
