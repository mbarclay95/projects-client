import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { MobileListComponent, MobileListRowComponent } from '../../../shared/components/mobile-list/mobile-list.component';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { MealsSignalStore } from '../../services/meals-signal-store';
import { RecipesSignalStore } from '../../services/recipes-signal-store';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { AddRecipeIngredientsModalComponent } from '../../components/add-recipe-ingredients-modal/add-recipe-ingredients-modal.component';
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
import { faCartPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss'],
  imports: [
    NoGroceryGroupComponent,
    CreateEditRecipeModalComponent,
    AddRecipeIngredientsModalComponent,
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
    MobileListComponent,
    MobileListRowComponent,
  ],
})
export class RecipesPageComponent {
  isMobile = isMobile;

  readonly authStore = inject(AuthSignalStore);
  readonly recipesStore = inject(RecipesSignalStore);
  private readonly mealsStore = inject(MealsSignalStore);

  cartPlus = faCartPlus;
  edit = faEdit;
  trash = faTrash;

  detailsFor(recipe: Recipe): string {
    const count = recipe.ingredients.length;
    return [`${count} ${count === 1 ? 'ingredient' : 'ingredients'}`, recipe.description].filter(Boolean).join(' · ');
  }

  deleteRecipe(id: number): void {
    this.recipesStore.remove({ id, onSuccess: () => this.mealsStore.loadAll({}) });
  }
}
