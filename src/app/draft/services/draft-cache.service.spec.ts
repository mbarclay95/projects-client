import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { DraftCacheService } from './draft-cache.service';
import { DraftService } from './draft.service';
import { Draft, DraftStatus, createDraft } from '../models/draft.model';
import { DraftMemberClaim } from '../models/draft-member-claim.model';

describe('DraftCacheService', () => {
  let service: DraftCacheService;
  let draft$: BehaviorSubject<Draft | undefined>;

  beforeEach(() => {
    localStorage.clear();
    draft$ = new BehaviorSubject<Draft | undefined>(undefined);

    TestBed.configureTestingModule({
      providers: [{ provide: DraftService, useValue: { draft$: draft$.asObservable() } }],
    });

    service = TestBed.inject(DraftCacheService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('round-trips through localStorage', async () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);

    expect(JSON.parse(localStorage.getItem('draft_cache') ?? '[]')).toEqual([
      { draftId: 12, draftMemberId: 34, name: 'Mike', secret: 'aB3' },
    ]);

    // loadDraftCache() reads back what setDraftCache() wrote, independent of
    // the in-memory value setMemberInCache() already set.
    service.loadDraftCache();
    draft$.next(createDraft({ id: 12, draftMembers: [{ id: 34, name: 'Mike', pickPosition: null, claimed: true }] }));

    expect(await firstValueFrom(service.me$)).toEqual({ draftId: 12, draftMemberId: 34, name: 'Mike', secret: 'aB3' });
  });

  it('keeps two drafts separate', () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);
    service.setMemberInCache(99, { id: 7, name: 'Gary', pickPosition: null, claimed: true, secret: 'zZ9' } as DraftMemberClaim);

    const stored = JSON.parse(localStorage.getItem('draft_cache') ?? '[]');
    expect(stored.length).toBe(2);
    expect(stored.find((c: { draftId: number }) => c.draftId === 12).name).toBe('Mike');
    expect(stored.find((c: { draftId: number }) => c.draftId === 99).name).toBe('Gary');
  });

  it('setMemberInCache replaces rather than appends an existing entry for the same draft', () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);
    service.setMemberInCache(12, { id: 56, name: 'Dave', pickPosition: null, claimed: true, secret: 'cD4' } as DraftMemberClaim);

    const stored = JSON.parse(localStorage.getItem('draft_cache') ?? '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe('Dave');
  });

  it('isMyTurn$ is false with an empty cache', async () => {
    draft$.next(createDraft({ id: 12, status: DraftStatus.inProgress, onTheClockMemberId: 34 }));

    expect(await firstValueFrom(service.isMyTurn$)).toBe(false);
  });

  it('isMyTurn$ is false on someone else’s turn', async () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);
    draft$.next(
      createDraft({
        id: 12,
        status: DraftStatus.inProgress,
        onTheClockMemberId: 99,
        draftMembers: [{ id: 34, name: 'Mike', pickPosition: null, claimed: true }],
      }),
    );

    expect(await firstValueFrom(service.isMyTurn$)).toBe(false);
  });

  it('isMyTurn$ is false when the draft is not in_progress', async () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);
    // Signup/locked/complete all leave onTheClockMemberId null, per public-draft.md.
    draft$.next(
      createDraft({
        id: 12,
        status: DraftStatus.signup,
        onTheClockMemberId: undefined,
        draftMembers: [{ id: 34, name: 'Mike', pickPosition: null, claimed: true }],
      }),
    );

    expect(await firstValueFrom(service.isMyTurn$)).toBe(false);
  });

  it('isMyTurn$ is true when the draft is in_progress and it is my turn', async () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);
    draft$.next(
      createDraft({
        id: 12,
        status: DraftStatus.inProgress,
        onTheClockMemberId: 34,
        draftMembers: [{ id: 34, name: 'Mike', pickPosition: null, claimed: true }],
      }),
    );

    expect(await firstValueFrom(service.isMyTurn$)).toBe(true);
  });

  it('me$ is undefined and staleIdentity$ is true when an admin clears the cached member’s claim', async () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);
    draft$.next(
      createDraft({
        id: 12,
        status: DraftStatus.inProgress,
        draftMembers: [{ id: 34, name: 'Mike', pickPosition: null, claimed: false }],
      }),
    );

    expect(await firstValueFrom(service.me$)).toBeUndefined();
    expect(await firstValueFrom(service.staleIdentity$)).toBe(true);
  });

  it('me$ is undefined and staleIdentity$ is true when the cached member no longer exists in the draft', async () => {
    service.setMemberInCache(12, { id: 34, name: 'Mike', pickPosition: null, claimed: true, secret: 'aB3' } as DraftMemberClaim);
    draft$.next(createDraft({ id: 12, status: DraftStatus.inProgress, draftMembers: [] }));

    expect(await firstValueFrom(service.me$)).toBeUndefined();
    expect(await firstValueFrom(service.staleIdentity$)).toBe(true);
  });

  it('staleIdentity$ is false when nothing was ever cached for this draft', async () => {
    draft$.next(createDraft({ id: 12, status: DraftStatus.inProgress }));

    expect(await firstValueFrom(service.staleIdentity$)).toBe(false);
  });
});
