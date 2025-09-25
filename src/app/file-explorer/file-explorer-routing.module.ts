import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileExplorerPageComponent } from './pages/file-explorer-page/file-explorer-page.component';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: FileExplorerPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileExplorerRoutingModule {}
