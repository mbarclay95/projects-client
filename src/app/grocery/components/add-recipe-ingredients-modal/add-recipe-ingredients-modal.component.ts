import { Component, computed, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { GroceryItemsSignalStore } from '../../services/grocery-items-signal-store';
import { GroceryListItemsSignalStore } from '../../services/grocery-list-items-signal-store';
import { RecipesSignalStore } from '../../services/recipes-signal-store';
import { GroceryItem, GroceryItemUnit } from '../../models/grocery-item.model';
import { onListNote } from '../../models/grocery-list-item.model';
import { addRecipeToListMessage, RecipeIngredient } from '../../models/recipe.model';

interface IngredientRow {
  ingredient: RecipeIngredient;
  item: GroceryItem;
}

@Component({
  selector: 'app-add-recipe-ingredients-modal',
  templateUrl: './add-recipe-ingredients-modal.component.html',
  styleUrls: ['./add-recipe-ingredients-modal.component.scss'],
  imports: [NzModalComponent, NzModalContentDirective, NzModalFooterDirective, FormsModule, NzInputNumberComponent, NzButtonComponent],
})
export class AddRecipeIngredientsModalComponent extends DefaultModalSignalComponent<number> {
  readonly recipesStore = inject(RecipesSignalStore);
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);
  readonly groceryListItemsStore = inject(GroceryListItemsSignalStore);
  private readonly nzMessageService = inject(NzMessageService);

  readonly groceryItemUnit = GroceryItemUnit;
  readonly onListNote = onListNote;

  readonly recipe = computed(() => this.recipesStore.entities().find((r) => r.id === this.openModal()));
  readonly rows = computed<IngredientRow[]>(() => {
    const recipe = this.recipe();
    if (!recipe) {
      return [];
    }
    const items = new Map(this.groceryItemsStore.entities().map((item) => [item.id, item]));
    return recipe.ingredients.flatMap((ingredient) => {
      const item = items.get(ingredient.groceryItemId);
      return item ? [{ ingredient, item }] : [];
    });
  });
  readonly amounts = signal<Record<number, number | null>>({});
  readonly addingAll = signal(false);

  override onOpenModal(): void {
    untracked(() => {
      const amounts: Record<number, number | null> = {};
      for (const { ingredient, item } of this.rows()) {
        if (item.unit !== GroceryItemUnit.none) {
          amounts[item.id] = ingredient.quantity ?? item.defaultQuantity ?? null;
        }
      }
      this.amounts.set(amounts);
    });
  }

  setAmount(item: GroceryItem, amount: number | null): void {
    this.amounts.update((amounts) => ({ ...amounts, [item.id]: amount }));
  }

  stepFor(item: GroceryItem): number {
    return item.unit === GroceryItemUnit.weight ? 0.1 : 1;
  }

  minFor(item: GroceryItem): number {
    return item.unit === GroceryItemUnit.weight ? 0.1 : 1;
  }

  private requestFor(item: GroceryItem) {
    return { groceryItemId: item.id, quantity: item.unit === GroceryItemUnit.none ? null : (this.amounts()[item.id] ?? null) };
  }

  add(item: GroceryItem): void {
    this.groceryListItemsStore.addBatch({ items: [this.requestFor(item)] });
  }

  addAll(): void {
    this.addingAll.set(true);
    this.groceryListItemsStore.addBatch({
      items: this.rows().map(({ item }) => this.requestFor(item)),
      onSuccess: (result) => {
        this.nzMessageService.success(addRecipeToListMessage(result));
        this.recipesStore.closeIngredients();
      },
      onSettled: () => this.addingAll.set(false),
    });
  }
}
