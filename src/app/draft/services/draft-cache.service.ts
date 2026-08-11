import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { DraftCache } from '../models/draft-cache.model';
import { DraftMemberClaim } from '../models/draft-member-claim.model';
import { DraftService } from './draft.service';

@Injectable({
  providedIn: 'root',
})
export class DraftCacheService {
  private draftService = inject(DraftService);

  private readonly cacheKey = 'draft_cache';
  private draftCache: BehaviorSubject<DraftCache[]> = new BehaviorSubject<DraftCache[]>([]);

  me$: Observable<DraftCache | undefined> = combineLatest([this.draftService.draft$, this.draftCache.asObservable()]).pipe(
    map(([draft, draftCache]) => draftCache.find((dc) => dc.draftId === draft?.id)),
  );

  isMyTurn$: Observable<boolean> = combineLatest([this.draftService.draft$, this.me$]).pipe(
    map(([draft, me]) => !!draft && !!me && draft.onTheClockMemberId === me.draftMemberId),
  );

  loadDraftCache(): void {
    this.draftCache.next(JSON.parse(localStorage.getItem(this.cacheKey) ?? '[]'));
  }

  setDraftCache(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.draftCache.value));
  }

  loadNewMemberIntoCache(draftId: number, member: DraftMemberClaim): void {
    const draftCache = this.draftCache.value;
    draftCache.push({
      draftId,
      draftMemberId: member.id,
      name: member.name,
      secret: member.secret,
    });
    this.draftCache.next(draftCache);
    this.setDraftCache();
  }
}
