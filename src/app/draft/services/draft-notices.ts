import { Draft } from '../models/draft.model';

export interface PickNotice {
  teamId: number;
  memberName: string;
  teamName: string;
}

export function draftNotices(previous: Draft | undefined, current: Draft, myMemberId: number | undefined): PickNotice[] {
  if (!previous || previous.id !== current.id) {
    return [];
  }

  const knownPickIds = new Set(previous.draftPicks.map((p) => p.id));

  return current.draftPicks
    .filter((p) => !knownPickIds.has(p.id))
    .filter((p) => p.madeByAdmin || p.draftMemberId !== myMemberId)
    .sort((a, b) => a.pickNumber - b.pickNumber)
    .map((p) => ({
      teamId: p.draftTeamId,
      memberName: current.draftMembers.find((m) => m.id === p.draftMemberId)?.name ?? 'Someone',
      teamName: current.draftTeams.find((t) => t.id === p.draftTeamId)?.name ?? 'a team',
    }));
}
