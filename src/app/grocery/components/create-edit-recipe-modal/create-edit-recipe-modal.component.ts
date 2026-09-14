import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { createRecipeIngredient, Recipe } from '../../models/recipe.model';
import { RecipesSignalStore } from '../../services/recipes-signal-store';
import { GroceryItem, GroceryItemUnit } from '../../models/grocery-item.model';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-edit-recipe-modal',
  templateUrl: './create-edit-recipe-modal.component.html',
  styleUrls: ['./create-edit-recipe-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    NzInputDirective,
    NzInputNumberComponent,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NzButtonComponent,
    FaIconComponent,
  ],
})
export class CreateEditRecipeModalComponent extends DefaultModalSignalComponent<Recipe> {
  readonly recipesStore = inject(RecipesSignalStore);
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  readonly groceryItemUnit = GroceryItemUnit;
  readonly minus = faMinus;
  readonly plus = faPlus;

  readonly newItemId = signal<number | null>(null);

  readonly ingredients = linkedSignal(() => [...(this.openModal()?.ingredients ?? [])]);

  readonly availableItems = computed(() => {
    const usedIds = new Set(this.ingredients().map((ingredient) => ingredient.groceryItemId));
    return this.groceryItemsStore.entities().filter((item) => !usedIds.has(item.id));
  });

  override onCloseModal(): void {
    this.newItemId.set(null);
  }

  itemFor(groceryItemId: number): GroceryItem | undefined {
    return this.groceryItemsStore.entities().find((item) => item.id === groceryItemId);
  }

  stepFor(item: GroceryItem): number {
    return item.unit === GroceryItemUnit.weight ? 0.1 : 1;
  }

  minFor(item: GroceryItem): number {
    return item.unit === GroceryItemUnit.weight ? 0.1 : 1;
  }

  placeholderFor(item: GroceryItem): string {
    return item.defaultQuantity !== null ? `${item.defaultQuantity}` : '';
  }

  setQuantity(groceryItemId: number, quantity: number | null): void {
    this.ingredients.set(
      this.ingredients().map((ingredient) => (ingredient.groceryItemId === groceryItemId ? { ...ingredient, quantity } : ingredient)),
    );
  }

  removeIngredient(groceryItemId: number): void {
    this.ingredients.set(this.ingredients().filter((ingredient) => ingredient.groceryItemId !== groceryItemId));
  }

  addIngredient(): void {
    const itemId = this.newItemId();
    if (itemId === null) {
      return;
    }
    this.ingredients.set([...this.ingredients(), createRecipeIngredient({ groceryItemId: itemId })]);
    this.newItemId.set(null);
  }

  saveRecipe(): void {
    if (!this.model) {
      return;
    }
    this.model.ingredients = this.ingredients();
    this.recipesStore.upsert({ entity: this.model, onSuccess: () => this.recipeSaved() });
  }

  recipeSaved(): void {
    this.nzMessageService.success('Recipe Saved!');
    this.recipesStore.clearCreateEditEntity();
  }
}
