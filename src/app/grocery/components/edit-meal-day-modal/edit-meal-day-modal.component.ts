import { Component, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { NzModalComponent, NzModalContentDirective, NzModalFooterDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzAutocompleteComponent, NzAutocompleteOptionComponent, NzAutocompleteTriggerDirective } from 'ng-zorro-antd/auto-complete';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { MEAL_SLOT_LABELS, MEAL_SLOTS, MealDraft, MealSlot, mealName, mealsBySlot } from '../../models/meal.model';
import { Recipe } from '../../models/recipe.model';
import { MealsSignalStore } from '../../services/meals-signal-store';
import { RecipesSignalStore } from '../../services/recipes-signal-store';

interface DraftRow {
  key: number;
  name: string;
}

type Drafts = Record<MealSlot, DraftRow[]>;

@Component({
  selector: 'app-edit-meal-day-modal',
  templateUrl: './edit-meal-day-modal.component.html',
  styleUrls: ['./edit-meal-day-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzModalFooterDirective,
    NzInputDirective,
    NzAutocompleteComponent,
    NzAutocompleteOptionComponent,
    NzAutocompleteTriggerDirective,
    NzButtonComponent,
    FormsModule,
    FaIconComponent,
  ],
})
export class EditMealDayModalComponent extends DefaultModalSignalComponent<string> {
  readonly mealsStore = inject(MealsSignalStore);
  readonly recipesStore = inject(RecipesSignalStore);
  private readonly nzMessageService = inject(NzMessageService);

  readonly slots = MEAL_SLOTS;
  readonly slotLabels = MEAL_SLOT_LABELS;
  readonly xmark = faXmark;

  readonly drafts = signal<Drafts>(this.emptyDrafts());

  private nextKey = 0;

  title(): string {
    const date = this.model;
    return date ? format(parseISO(date), 'EEEE, MMM d') : '';
  }

  override onOpenModal(): void {
    untracked(() => {
      const date = this.model;
      if (!date) {
        return;
      }
      const meals = this.mealsStore.entities();
      const recipes = this.recipesStore.entities();
      const groups = mealsBySlot(meals, date);
      const drafts = this.emptyDrafts();
      for (const slot of MEAL_SLOTS) {
        const group = groups.find((candidate) => candidate.slot === slot);
        const rows = (group?.meals ?? []).map((meal) => this.newRow(mealName(meal, recipes)));
        drafts[slot] = rows.length > 0 ? rows : [this.newRow('')];
      }
      this.drafts.set(drafts);
    });
  }

  suggestionsFor(text: string): Recipe[] {
    const needle = text.trim().toLowerCase();
    return this.recipesStore.entities().filter((recipe) => recipe.name.toLowerCase().includes(needle));
  }

  setName(slot: MealSlot, key: number, name: string): void {
    this.drafts.update((drafts) => ({
      ...drafts,
      [slot]: drafts[slot].map((row) => (row.key === key ? { ...row, name } : row)),
    }));
  }

  addRow(slot: MealSlot): void {
    this.drafts.update((drafts) => ({ ...drafts, [slot]: [...drafts[slot], this.newRow('')] }));
  }

  removeRow(slot: MealSlot, key: number): void {
    this.drafts.update((drafts) => ({ ...drafts, [slot]: drafts[slot].filter((row) => row.key !== key) }));
  }

  save(): void {
    const date = this.model;
    if (!date) {
      return;
    }
    const drafts = this.drafts();
    const meals: MealDraft[] = MEAL_SLOTS.flatMap((slot) =>
      drafts[slot].map((row) => ({ slot, name: row.name.trim() })).filter((meal) => meal.name !== ''),
    );
    this.mealsStore.saveDay({
      date,
      meals,
      onSuccess: () => {
        this.nzMessageService.success('Meals saved!');
        this.mealsStore.closeDay();
      },
    });
  }

  private newRow(name: string): DraftRow {
    return { key: this.nextKey++, name };
  }

  private emptyDrafts(): Drafts {
    return { breakfast: [], lunch: [], dinner: [] };
  }
}
