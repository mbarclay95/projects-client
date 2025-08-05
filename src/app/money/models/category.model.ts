export interface Category {
  id: number;
  name: string;
  isActive: boolean;
  income: boolean;
  savings: boolean;
  sort: number;
  showInBudget: boolean;
}

export function createCategory(params: Partial<Category>): Category {
  return {
    id: params.id,
    name: params.name ?? '',
    isActive: params.isActive ?? true,
    income: params.income ?? false,
    savings: params.savings ?? false,
    sort: params.sort ?? null,
    showInBudget: params.showInBudget ?? false,
  } as Category;
}
