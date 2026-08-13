import { createDraftAdmin, DraftAdmin } from './draft-admin.model';
import { createDraftImage, DraftImage } from './draft-image.model';
import { createDraftTeam, DraftTeam } from './draft-team.model';
import { createDraftMember, DraftMember } from './draft-member.model';
import { createDraftPick, DraftPick } from './draft-pick.model';

export enum DraftStatus {
  signup = 'signup',
  locked = 'locked',
  inProgress = 'in_progress',
  complete = 'complete',
}

export const DRAFT_STATUS_LABELS: Record<DraftStatus, string> = {
  [DraftStatus.signup]: 'Signup',
  [DraftStatus.locked]: 'Locked',
  [DraftStatus.inProgress]: 'In Progress',
  [DraftStatus.complete]: 'Complete',
};

export const DRAFT_STATUS_COLORS: Record<DraftStatus, string> = {
  [DraftStatus.signup]: 'blue',
  [DraftStatus.locked]: 'orange',
  [DraftStatus.inProgress]: 'processing',
  [DraftStatus.complete]: 'green',
};

export interface Draft {
  id: number;
  name: string;
  notes?: string;
  draftDate: Date;
  token: string;
  status: DraftStatus;
  totalRounds: number;
  maxParticipants?: number;
  draftImage: DraftImage | null;
  draftImageId: number | null;
  createdById: number;
  deletedAt: Date;
  draftAdmins: DraftAdmin[];
  draftTeams: DraftTeam[];
  draftMembers: DraftMember[];
  draftPicks: DraftPick[];
  draftUrl: string;
}

export function createDraft(params: Partial<Draft>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    notes: params.notes ?? undefined,
    draftDate: params.draftDate ? new Date(params.draftDate) : null,
    token: params.token ?? null,
    status: params.status ?? DraftStatus.signup,
    totalRounds: params.totalRounds ?? 1,
    maxParticipants: params.maxParticipants ?? undefined,
    // Both are carried because the store PUTs the whole entity: draftImage
    // renders the thumbnail, draftImageId is what the API persists.
    draftImage: params.draftImage ? createDraftImage(params.draftImage) : null,
    draftImageId: params.draftImage?.id ?? params.draftImageId ?? null,
    createdById: params.createdById ?? 0,
    deletedAt: params.deletedAt ? new Date(params.deletedAt) : null,
    draftAdmins: params.draftAdmins ? params.draftAdmins.map((a) => createDraftAdmin(a)) : [],
    draftTeams: params.draftTeams ? params.draftTeams.map((t) => createDraftTeam(t)) : [],
    draftMembers: params.draftMembers ? params.draftMembers.map((m) => createDraftMember(m)) : [],
    draftPicks: params.draftPicks ? params.draftPicks.map((p) => createDraftPick(p)) : [],
    draftUrl: `/draft/${params.id}?token=${params.token}`,
  } as Draft;
}

/**
 * A client-side mirror of `DraftService`'s turn derivation on the backend,
 * following the precedent `rosterIsFullyOrdered()` set in
 * `draft-member.model.ts`: this is UX only. The backend is the enforcement
 * and does not move with it.
 */
export function draftIsComplete(draft: Draft): boolean {
  return pickCount(draft) >= orderedMemberCount(draft) * draft.totalRounds;
}

export function nextPickNumber(draft: Draft): number {
  return pickCount(draft) + 1;
}

export function currentRound(draft: Draft): number {
  const memberCount = orderedMemberCount(draft);
  if (memberCount === 0) {
    return 1;
  }

  return Math.floor(pickCount(draft) / memberCount) + 1;
}

export function onTheClockMemberId(draft: Draft): number | undefined {
  const memberCount = orderedMemberCount(draft);
  if (memberCount === 0 || draftIsComplete(draft)) {
    return undefined;
  }

  const position = (pickCount(draft) % memberCount) + 1;

  return draft.draftMembers.find((member) => member.pickPosition === position)?.id;
}

function pickCount(draft: Draft): number {
  return draft.draftPicks.length;
}

function orderedMemberCount(draft: Draft): number {
  return draft.draftMembers.filter((member) => member.pickPosition !== null).length;
}
