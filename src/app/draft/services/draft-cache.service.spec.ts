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
    service.loadNewMemberIntoCache(12, { id: 34, name: 'Mike', pickPosition: null, secret: 'aB3' } as DraftMemberClaim);

    expect(JSON.parse(localStorage.getItem('draft_cache') ?? '[]')).toEqual([
      { draftId: 12, draftMemberId: 34, name: 'Mike', secret: 'aB3' },
    ]);

    // loadDraftCache() reads back what setDraftCache() wrote, independent of
    // the in-memory value loadNewMemberIntoCache() already set.
    service.loadDraftCache();
    draft$.next(createDraft({ id: 12 }));

    expect(await firstValueFrom(service.me$)).toEqual({ draftId: 12, draftMemberId: 34, name: 'Mike', secret: 'aB3' });
  });

  it('keeps two drafts separate', () => {
    service.loadNewMemberIntoCache(12, { id: 34, name: 'Mike', pickPosition: null, secret: 'aB3' } as DraftMemberClaim);
    service.loadNewMemberIntoCache(99, { id: 7, name: 'Gary', pickPosition: null, secret: 'zZ9' } as DraftMemberClaim);

    const stored = JSON.parse(localStorage.getItem('draft_cache') ?? '[]');
    expect(stored.length).toBe(2);
    expect(stored.find((c: { draftId: number }) => c.draftId === 12).name).toBe('Mike');
    expect(stored.find((c: { draftId: number }) => c.draftId === 99).name).toBe('Gary');
  });

  it('isMyTurn$ is false with an empty cache', async () => {
    draft$.next(createDraft({ id: 12, status: DraftStatus.inProgress, onTheClockMemberId: 34 }));

    expect(await firstValueFrom(service.isMyTurn$)).toBe(false);
  });

  it('isMyTurn$ is false on someone else’s turn', async () => {
    service.loadNewMemberIntoCache(12, { id: 34, name: 'Mike', pickPosition: null, secret: 'aB3' } as DraftMemberClaim);
    draft$.next(createDraft({ id: 12, status: DraftStatus.inProgress, onTheClockMemberId: 99 }));

    expect(await firstValueFrom(service.isMyTurn$)).toBe(false);
  });

  it('isMyTurn$ is false when the draft is not in_progress', async () => {
    service.loadNewMemberIntoCache(12, { id: 34, name: 'Mike', pickPosition: null, secret: 'aB3' } as DraftMemberClaim);
    // Signup/locked/complete all leave onTheClockMemberId null, per public-draft.md.
    draft$.next(createDraft({ id: 12, status: DraftStatus.signup, onTheClockMemberId: undefined }));

    expect(await firstValueFrom(service.isMyTurn$)).toBe(false);
  });

  it('isMyTurn$ is true when the draft is in_progress and it is my turn', async () => {
    service.loadNewMemberIntoCache(12, { id: 34, name: 'Mike', pickPosition: null, secret: 'aB3' } as DraftMemberClaim);
    draft$.next(createDraft({ id: 12, status: DraftStatus.inProgress, onTheClockMemberId: 34 }));

    expect(await firstValueFrom(service.isMyTurn$)).toBe(true);
  });
});
