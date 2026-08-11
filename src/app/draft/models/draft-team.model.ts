export interface DraftTeam {
  id: number;
  name: string;
  sortOrder: number;
  hasImage: boolean;
}

export function createDraftTeam(params: Partial<DraftTeam>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    sortOrder: params.sortOrder ?? 0,
    hasImage: params.hasImage ?? false,
  } as DraftTeam;
}
