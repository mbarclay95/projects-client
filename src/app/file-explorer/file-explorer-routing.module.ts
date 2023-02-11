import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileExplorerPageComponent} from './pages/file-explorer-page/file-explorer-page.component';
import {FileExplorerResolver} from './file-explorer.resolver';

const routes: Routes = [
  {
    path: '', resolve: {FileExplorerResolver}, children: [
      {path: '', component: FileExplorerPageComponent, }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileExplorerRoutingModule { }
