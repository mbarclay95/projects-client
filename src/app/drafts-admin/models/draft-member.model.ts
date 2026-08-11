export interface DraftMember {
  id: number;
  draftId: number;
  name: string;
  pickPosition: number | null;
  claimedAt: Date | null;
}

export function createDraftMember(params: Partial<DraftMember>) {
  return {
    id: params.id ?? 0,
    draftId: params.draftId ?? 0,
    name: params.name ?? '',
    pickPosition: params.pickPosition ?? null,
    claimedAt: params.claimedAt ? new Date(params.claimedAt) : null,
  } as DraftMember;
}

/**
 * Mirrors `DraftService::rosterIsFullyOrdered()` on the backend: every member
 * position 1..N, no gaps, nobody unordered. Lets the status control disable
 * `in_progress` before the API ever gets a chance to 422 it.
 */
export function rosterIsFullyOrdered(members: DraftMember[]): boolean {
  if (members.length === 0) {
    return false;
  }

  const orderedCount = members.filter((member) => member.pickPosition !== null).length;
  const maxPosition = Math.max(...members.map((member) => member.pickPosition ?? 0));

  return orderedCount === members.length && maxPosition === members.length;
}
