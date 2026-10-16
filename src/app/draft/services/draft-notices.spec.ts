import { describe, expect, it } from 'vitest';
import { createDraft, Draft } from '../models/draft.model';
import { createDraftMember } from '../models/draft-member.model';
import { createDraftTeam } from '../models/draft-team.model';
import { draftNotices } from './draft-notices';

describe('draftNotices', () => {
  const members = [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Sam' },
  ];
  const teams = [
    { id: 10, name: 'Real Madrid' },
    { id: 11, name: 'Ajax' },
  ];

  function draftWith(picks: Partial<Draft['draftPicks'][number]>[], id = 5) {
    return createDraft({
      id,
      draftMembers: members.map(createDraftMember),
      draftTeams: teams.map(createDraftTeam),
      draftPicks: picks.map((p) => ({ id: 0, pickNumber: 1, draftMemberId: 1, draftTeamId: 10, madeByAdmin: false, ...p })),
    });
  }

  it('announces nothing without a previous draft', () => {
    expect(draftNotices(undefined, draftWith([{ id: 1 }]), 2)).toEqual([]);
  });

  it('announces nothing when the draft id differs', () => {
    expect(draftNotices(draftWith([], 4), draftWith([{ id: 1 }], 5), 2)).toEqual([]);
  });

  it("announces another member's new pick", () => {
    expect(draftNotices(draftWith([]), draftWith([{ id: 1 }]), 2)).toEqual([{ teamId: 10, memberName: 'Alex', teamName: 'Real Madrid' }]);
  });

  it('does not announce picks already in previous', () => {
    const d = draftWith([{ id: 1 }]);
    expect(draftNotices(d, d, 2)).toEqual([]);
  });

  it("does not announce the viewer's own pick", () => {
    expect(draftNotices(draftWith([]), draftWith([{ id: 1, draftMemberId: 2 }]), 2)).toEqual([]);
  });

  it('announces an admin pick made for the viewer', () => {
    expect(draftNotices(draftWith([]), draftWith([{ id: 1, draftMemberId: 2, madeByAdmin: true }]), 2)).toEqual([
      { teamId: 10, memberName: 'Sam', teamName: 'Real Madrid' },
    ]);
  });

  it('announces nothing when a pick is removed', () => {
    expect(draftNotices(draftWith([{ id: 1 }]), draftWith([]), 2)).toEqual([]);
  });

  it('announces nothing when a pick changes team', () => {
    expect(draftNotices(draftWith([{ id: 1 }]), draftWith([{ id: 1, draftTeamId: 11 }]), 2)).toEqual([]);
  });

  it('orders multiple new picks by pickNumber', () => {
    const current = draftWith([
      { id: 2, pickNumber: 2, draftTeamId: 11 },
      { id: 1, pickNumber: 1, draftTeamId: 10 },
    ]);
    expect(draftNotices(draftWith([]), current, 2).map((n) => n.teamName)).toEqual(['Real Madrid', 'Ajax']);
  });

  it('falls back when the member or team is missing', () => {
    const current = draftWith([{ id: 1, draftMemberId: 99, draftTeamId: 98 }]);
    expect(draftNotices(draftWith([]), current, 2)).toEqual([{ teamId: 98, memberName: 'Someone', teamName: 'a team' }]);
  });
});
