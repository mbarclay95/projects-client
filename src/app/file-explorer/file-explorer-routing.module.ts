import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileExplorerPageComponent } from './pages/file-explorer-page/file-explorer-page.component';
import { FileExplorerResolver } from './file-explorer.resolver';
import { TypedRoute } from '../app-routing.module';

const routes: TypedRoute[] = [
  {
    path: '',
    resolve: { FileExplorerResolver },
    children: [{ path: '', component: FileExplorerPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileExplorerRoutingModule {}
