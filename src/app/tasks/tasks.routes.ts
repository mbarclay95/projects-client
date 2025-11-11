import { TypedRoute } from '../app.routes';
import { TaskTabsComponent } from './pages/task-tabs/task-tabs.component';
import { WeeklyTasksPageComponent } from './pages/weekly-tasks-page/weekly-tasks-page.component';
import { MyFamilyPageComponent } from './pages/my-family-page/my-family-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { FamiliesPageComponent } from './pages/families-page/families-page.component';

export const TASK_ROUTES: TypedRoute[] = [
  {
    path: '',
    data: { footerButtons: 'tasks' },
    children: [
      { path: '', component: TaskTabsComponent },
      {
        path: 'weekly-tasks',
        data: { createButtonAction: 'tasks', headerTitle: 'To Do' },
        component: WeeklyTasksPageComponent,
      },
      {
        path: 'my-family',
        data: { headerTitle: 'My Family' },
        component: MyFamilyPageComponent,
      },
      {
        path: 'stats',
        data: { headerTitle: 'Stats' },
        component: StatsPageComponent,
      },
      { path: 'tasks', data: { createButtonAction: 'tasks' }, component: TasksPageComponent },
      {
        path: 'families',
        data: { createButtonAction: 'families', headerTitle: 'Families' },
        component: FamiliesPageComponent,
      },
    ],
  },
];
