export interface CategoryTag {
  id: number;
  name: string;
  isActive: boolean;
  sort: number;
}

export function createCategoryTag(params: Partial<CategoryTag>): CategoryTag {
  return {
    id: params.id ?? 0,
    idString: (params.id ?? 0).toString(),
    name: params.name ?? '',
    isActive: params.isActive ?? true,
    sort: params.sort ?? null,
  } as CategoryTag;
}
