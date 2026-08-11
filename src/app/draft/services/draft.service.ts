import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, EMPTY, firstValueFrom, map, Observable, switchMap, timer } from 'rxjs';
import { createDraft, Draft, DraftStatus } from '../models/draft.model';
import { createDraftMember } from '../models/draft-member.model';
import { DraftMemberClaim } from '../models/draft-member-claim.model';
import { createDraftPick, DraftPick } from '../models/draft-pick.model';
import { environment } from '../../../environments/environment';

interface DraftPickResult {
  pick: DraftPick;
  status: DraftStatus;
  currentPickNumber: number;
  onTheClockMemberId: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class DraftService {
  private http = inject(HttpClient);

  private draftSubject: BehaviorSubject<Draft | undefined> = new BehaviorSubject<Draft | undefined>(undefined);
  draft$: Observable<Draft | undefined> = this.draftSubject.asObservable();
  private draftId?: string;
  private token?: string;

  constructor() {
    // Polls only while in_progress: signup and locked have nothing to poll
    // for, and complete never changes again. distinctUntilChanged on the
    // status alone (not the whole draft) means a poll tick that returns the
    // same status doesn't restart timer(0, 3000) at zero every 3s.
    this.draft$
      .pipe(
        map((draft) => draft?.status),
        distinctUntilChanged(),
        switchMap((status) => (status === DraftStatus.inProgress ? timer(0, 3000) : EMPTY)),
        switchMap(() => this.fetchDraft()),
        takeUntilDestroyed(),
      )
      .subscribe((draft) => this.draftSubject.next(draft));
  }

  async getDraft(draftId: string, token: string): Promise<void> {
    this.draftId = draftId;
    this.token = token;
    const draft = await firstValueFrom(this.fetchDraft());
    this.draftSubject.next(draft);
  }

  async claimMember(name: string): Promise<DraftMemberClaim> {
    const claimed = await firstValueFrom(
      this.http.post<DraftMemberClaim>(`${environment.publicApiUrl}/draft-members`, {
        draftId: this.getId(),
        token: this.token,
        name,
      }),
    );

    // The response carries no `claimed` field — it's the signup endpoint,
    // not the read — but a name just signed up is claimed by definition.
    const draft = createDraft(this.draftSubject.value ?? {});
    draft.draftMembers.push(createDraftMember({ ...claimed, claimed: true }));
    this.draftSubject.next(draft);

    return claimed;
  }

  /**
   * Binds this browser to an existing, unclaimed member. Response shape is
   * byte-identical to claimMember()'s, per in-draft-control.md, so the same
   * DraftMemberClaim type covers both.
   */
  async claimExistingMember(draftMemberId: number): Promise<DraftMemberClaim> {
    const claimed = await firstValueFrom(
      this.http.post<DraftMemberClaim>(`${environment.publicApiUrl}/draft-member-claims`, {
        draftId: this.getId(),
        token: this.token,
        draftMemberId,
      }),
    );

    const draft = createDraft(this.draftSubject.value ?? {});
    const member = draft.draftMembers.find((m) => m.id === draftMemberId);
    if (member) {
      member.claimed = true;
    }
    this.draftSubject.next(draft);

    return claimed;
  }

  async makePick(draftTeamId: number, secret: string): Promise<void> {
    const result = await firstValueFrom(
      this.http.post<DraftPickResult>(`${environment.publicApiUrl}/draft-picks`, {
        draftId: this.getId(),
        token: this.token,
        secret,
        draftTeamId,
      }),
    );

    const draft = createDraft(this.draftSubject.value ?? {});
    draft.draftPicks.push(createDraftPick(result.pick));
    draft.status = result.status;
    draft.currentPickNumber = result.currentPickNumber;
    draft.onTheClockMemberId = result.onTheClockMemberId ?? undefined;
    this.draftSubject.next(draft);
  }

  /**
   * Re-fetches outside the 3s poll — used after a failed claim, where the
   * member list shown might already be stale (someone else claimed the same
   * row in the interim) and the next poll tick could be seconds away, or
   * never arrive at all outside in_progress.
   */
  async refreshDraft(): Promise<void> {
    const draft = await firstValueFrom(this.fetchDraft());
    this.draftSubject.next(draft);
  }

  draftNotLoaded(): boolean {
    return !this.draftSubject.value;
  }

  getId(): number {
    return this.draftSubject.value?.id ?? 0;
  }

  getToken(): string {
    return this.token ?? '';
  }

  private fetchDraft(): Observable<Draft> {
    return this.http
      .get<Draft>(`${environment.publicApiUrl}/drafts/${this.draftId}?token=${this.token}`)
      .pipe(map((draft) => createDraft(draft)));
  }
}
