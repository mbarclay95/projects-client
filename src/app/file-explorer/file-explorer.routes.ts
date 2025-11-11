import { TypedRoute } from '../app.routes';
import { FileExplorerPageComponent } from './pages/file-explorer-page/file-explorer-page.component';

export const FILE_EXPLORER_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: FileExplorerPageComponent }],
  },
];
