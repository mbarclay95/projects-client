export interface GroceryItem {
  id: number;
  name: string;
  notes: string | null;
  tags: string[];
}

export function createGroceryItem(params: Partial<GroceryItem>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.notes ?? null,
    tags: params.tags ?? [],
  } as GroceryItem;
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
