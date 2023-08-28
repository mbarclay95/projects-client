import {Category, createCategory} from './category.model';

export interface SubCategory {
  id: number;
  name: string;
  isActive: boolean;
  category: Category;
  sort: number;
  showInBudget: boolean;
}

export function createSubCategory(params: Partial<SubCategory>): SubCategory {
  return {
    id: params.id,
    name: params.name ?? '',
    isActive: params.isActive ?? true,
    category: createCategory(params.category ?? {}),
    sort: params.sort ?? null,
    showInBudget: params.showInBudget ?? false
  } as SubCategory;
}
