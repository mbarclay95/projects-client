export interface DraftAdminCandidate {
  id: number;
  name: string;
}

export function createDraftAdminCandidate(params: Partial<DraftAdminCandidate>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
  } as DraftAdminCandidate;
}
