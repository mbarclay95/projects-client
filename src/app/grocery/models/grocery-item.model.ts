export enum GroceryItemUnit {
  none = 'none',
  weight = 'weight',
  count = 'count',
}

export const GROCERY_ITEM_UNIT_LABELS: Record<GroceryItemUnit, string> = {
  [GroceryItemUnit.none]: 'None',
  [GroceryItemUnit.weight]: 'Weight (lb)',
  [GroceryItemUnit.count]: 'Count',
};

export interface GroceryItem {
  id: number;
  name: string;
  notes: string | null;
  tags: string[];
  unit: GroceryItemUnit;
  defaultQuantity: number | null;
}

export function createGroceryItem(params: Partial<GroceryItem>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.notes ?? null,
    tags: params.tags ?? [],
    unit: params.unit ?? GroceryItemUnit.none,
    defaultQuantity: params.defaultQuantity ?? null,
  } as GroceryItem;
}

export function formatGroceryItemAmount(item: GroceryItem): string {
  switch (item.unit) {
    case GroceryItemUnit.weight:
      return item.defaultQuantity !== null ? `${item.defaultQuantity} lb` : 'lb';
    case GroceryItemUnit.count:
      return item.defaultQuantity !== null ? `${item.defaultQuantity}` : 'Count';
    default:
      return '';
  }
}

export function filterGroceryItems(items: GroceryItem[], search: string, tags: string[]): GroceryItem[] {
  let filtered = items;

  if (search) {
    const lowerSearch = search.toLowerCase();
    filtered = filtered.filter((item) => item.name.toLowerCase().includes(lowerSearch));
  }

  if (tags.length > 0) {
    filtered = filtered.filter((item) => item.tags.some((tag) => tags.includes(tag)));
  }

  return filtered;
}
