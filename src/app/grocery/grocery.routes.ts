import { TypedRoute } from '../app.routes';
import { GroceryTabsComponent } from './pages/grocery-tabs/grocery-tabs.component';
import { ShoppingListPageComponent } from './pages/shopping-list-page/shopping-list-page.component';
import { GroceryItemsPageComponent } from './pages/grocery-items-page/grocery-items-page.component';

export const GROCERY_ROUTES: TypedRoute[] = [
  {
    path: '',
    data: { footerButtons: 'grocery' },
    children: [
      { path: '', component: GroceryTabsComponent },
      {
        path: 'shopping-list',
        data: { headerTitle: 'Shopping List', createButtonAction: 'grocery-list' },
        component: ShoppingListPageComponent,
      },
      {
        path: 'master-list',
        data: { headerTitle: 'Master List', createButtonAction: 'grocery' },
        component: GroceryItemsPageComponent,
      },
    ],
  },
];
