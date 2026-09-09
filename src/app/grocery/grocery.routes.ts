import { TypedRoute } from '../app.routes';
import { GroceryItemsPageComponent } from './pages/grocery-items-page/grocery-items-page.component';

export const GROCERY_ROUTES: TypedRoute[] = [
  {
    path: '',
    children: [{ path: '', component: GroceryItemsPageComponent }],
  },
];
