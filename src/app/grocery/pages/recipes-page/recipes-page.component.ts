import { Component, inject } from '@angular/core';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { RecipesSignalStore } from '../../services/recipes-signal-store';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { CreateEditRecipeModalComponent } from '../../components/create-edit-recipe-modal/create-edit-recipe-modal.component';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss'],
  imports: [
    NoGroceryGroupComponent,
    CreateEditRecipeModalComponent,
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzButtonComponent,
    NzPopconfirmDirective,
    NzEmptyComponent,
    NzModalModule,
    FaIconComponent,
  ],
})
export class RecipesPageComponent {
  readonly authStore = inject(AuthSignalStore);
  readonly recipesStore = inject(RecipesSignalStore);

  edit = faEdit;
  trash = faTrash;

  deleteRecipe(id: number): void {
    this.recipesStore.remove({ id });
  }
}
