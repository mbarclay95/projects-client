import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { DraftCache } from '../models/draft-cache.model';
import { DraftMemberClaim } from '../models/draft-member-claim.model';
import { DraftService } from './draft.service';

interface CachedMemberStatus {
  cached: DraftCache;
  validClaim: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DraftCacheService {
  private draftService = inject(DraftService);

  private readonly cacheKey = 'draft_cache';

  /**
   * Kept out of `draft_cache` deliberately: that key holds claim identities
   * and only ever has entries for drafts this browser joined, while the
   * celebration fires for anyone watching, claimed or not.
   */
  private readonly celebratedKey = 'draft_celebrated';

  private draftCache: BehaviorSubject<DraftCache[]> = new BehaviorSubject<DraftCache[]>([]);

  /**
   * The cache is trusted blindly no further than this: a cached entry whose
   * member is gone from the draft, or whose claim was cleared, is not "me"
   * any more. Shared by me$ and staleIdentity$ so the two conditions can't
   * drift apart.
   */
  private cachedMemberStatus$: Observable<CachedMemberStatus | undefined> = combineLatest([
    this.draftService.draft$,
    this.draftCache.asObservable(),
  ]).pipe(
    map(([draft, draftCache]) => {
      const cached = draftCache.find((dc) => dc.draftId === draft?.id);
      if (!cached || !draft) {
        return undefined;
      }
      const member = draft.draftMembers.find((m) => m.id === cached.draftMemberId);

      return { cached, validClaim: !!member && member.claimed };
    }),
  );

  me$: Observable<DraftCache | undefined> = this.cachedMemberStatus$.pipe(
    map((status) => (status?.validClaim ? status.cached : undefined)),
  );

  /**
   * True exactly when this browser held an identity for the current draft
   * and it stopped being valid — the member was removed, or an admin cleared
   * the claim. Drives the "Your claim was reset" line; claim/signup buttons
   * come back on their own because me$ goes undefined at the same time.
   */
  staleIdentity$: Observable<boolean> = this.cachedMemberStatus$.pipe(map((status) => !!status && !status.validClaim));

  isMyTurn$: Observable<boolean> = combineLatest([this.draftService.draft$, this.me$]).pipe(
    map(([draft, me]) => !!draft && !!me && draft.onTheClockMemberId === me.draftMemberId),
  );

  loadDraftCache(): void {
    this.draftCache.next(JSON.parse(localStorage.getItem(this.cacheKey) ?? '[]'));
  }

  setDraftCache(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.draftCache.value));
  }

  /**
   * Replaces, rather than appends, any existing entry for this draft — claiming
   * when an entry already exists must not leave a second, stale one behind for
   * me$ to find first.
   */
  setMemberInCache(draftId: number, member: DraftMemberClaim): void {
    const draftCache = this.draftCache.value.filter((dc) => dc.draftId !== draftId);
    draftCache.push({
      draftId,
      draftMemberId: member.id,
      name: member.name,
      secret: member.secret,
    });
    this.draftCache.next(draftCache);
    this.setDraftCache();
  }

  hasCelebrated(draftId: number): boolean {
    return this.celebratedDraftIds().includes(draftId);
  }

  markCelebrated(draftId: number): void {
    const draftIds = this.celebratedDraftIds();
    if (draftIds.includes(draftId)) {
      return;
    }

    draftIds.push(draftId);
    localStorage.setItem(this.celebratedKey, JSON.stringify(draftIds));
  }

  /**
   * An admin undoing the final pick puts the draft back in progress, so
   * finishing it a second time is a new completion and has to be able to
   * celebrate again. Nothing writes unless the id is actually there — this is
   * called on every poll tick of an unfinished draft.
   */
  clearCelebrated(draftId: number): void {
    const draftIds = this.celebratedDraftIds();
    if (!draftIds.includes(draftId)) {
      return;
    }

    localStorage.setItem(this.celebratedKey, JSON.stringify(draftIds.filter((id) => id !== draftId)));
  }

  private celebratedDraftIds(): number[] {
    return JSON.parse(localStorage.getItem(this.celebratedKey) ?? '[]');
  }
}
