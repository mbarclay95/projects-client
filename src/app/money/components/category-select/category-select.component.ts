import { Component, computed, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { NzOptionComponent, NzOptionGroupComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { SubCategory } from '../../models/sub-category.model';
import { CategoriesSignalStore } from '../../services/categories-signal-store';
import { SubCategoriesSignalStore } from '../../services/sub-categories-signal-store';

@Component({
  selector: 'app-category-select',
  imports: [NzSelectComponent, FormsModule, NzOptionGroupComponent, NzOptionComponent],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.scss',
})
export class CategorySelectComponent {
  subCategory = input<SubCategory | number | string | null>(null);
  showIncomeSubCategories = input<boolean>(true);
  @Input() allowClear = false;

  @Output() selectedSubCategory: EventEmitter<SubCategory | null> = new EventEmitter<SubCategory | null>();

  readonly categoriesStore = inject(CategoriesSignalStore);
  readonly subCategoriesStore = inject(SubCategoriesSignalStore);

  currentSubCategory = computed(() => {
    const value = this.subCategory();
    if (typeof value === 'number') {
      return this.subCategoriesStore.entityMap()[value];
    } else if (typeof value === 'string') {
      return this.subCategoriesStore.entityMap()[parseInt(value, 10)];
    }
    return value;
  });
  categoriesList = computed(() => {
    if (this.showIncomeSubCategories()) {
      return this.categoriesStore.activeCategories();
    }
    return this.categoriesStore.activeNotIncomeCategories();
  });
  categoriesWithSubCategories = computed(() => {
    const activeSubCategories = this.subCategoriesStore.activeSubCategories();
    return this.categoriesList().map((category) => ({
      category,
      subCategories: activeSubCategories.filter((sc) => sc.category.id === category.id),
    }));
  });

  compareSubCategories(s1: SubCategory, s2: SubCategory): boolean {
    if (!s1 || !s2) {
      return false;
    }

    return s1.id === s2.id;
  }
}
