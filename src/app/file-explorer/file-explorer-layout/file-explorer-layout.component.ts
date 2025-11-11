import { Component } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-file-explorer-layout',
  templateUrl: './file-explorer-layout.component.html',
  styleUrls: ['./file-explorer-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class FileExplorerLayoutComponent {}
