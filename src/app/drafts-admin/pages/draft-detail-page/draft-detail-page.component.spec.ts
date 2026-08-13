import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DraftDetailPageComponent } from './draft-detail-page.component';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { createDraft, Draft, DraftStatus } from '../../models/draft.model';
import { createDraftMember } from '../../models/draft-member.model';

/**
 * Which statuses the organizer may move to, and why not when they may not.
 * Complete is the interesting case: it is terminal, reachable only by the last
 * pick landing and left only by undoing one.
 */
describe('DraftDetailPageComponent status gating', () => {
  const orderedRoster = [createDraftMember({ id: 1, pickPosition: 1 }), createDraftMember({ id: 2, pickPosition: 2 })];

  function componentFor(draft: Draft): DraftDetailPageComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: DraftsSignalStore, useValue: { activeEntity: signal(draft), setActiveId: vi.fn(), update: vi.fn() } },
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map()) } },
        { provide: NzModalService, useValue: { warning: vi.fn() } },
      ],
    });

    return TestBed.runInInjectionContext(() => new DraftDetailPageComponent());
  }

  it('blocks every other status once the draft is complete', () => {
    const component = componentFor(createDraft({ id: 1, status: DraftStatus.complete, draftMembers: orderedRoster }));

    expect(component.canSelectStatus(DraftStatus.signup)).toBe(false);
    expect(component.canSelectStatus(DraftStatus.locked)).toBe(false);
    expect(component.canSelectStatus(DraftStatus.inProgress)).toBe(false);
  });

  it('explains that undoing a pick is the way out of complete', () => {
    const component = componentFor(createDraft({ id: 1, status: DraftStatus.complete, draftMembers: orderedRoster }));

    expect(component.statusDisabledReason(DraftStatus.inProgress)).toContain('Undo a pick');
  });

  it('leaves complete itself selectable so the control still shows where the draft is', () => {
    const component = componentFor(createDraft({ id: 1, status: DraftStatus.complete, draftMembers: orderedRoster }));

    expect(component.canSelectStatus(DraftStatus.complete)).toBe(true);
  });

  it('still blocks in progress on an unordered roster, naming the roster as the reason', () => {
    const component = componentFor(
      createDraft({
        id: 1,
        status: DraftStatus.signup,
        draftMembers: [createDraftMember({ id: 1, pickPosition: 1 }), createDraftMember({ id: 2, pickPosition: null })],
      }),
    );

    expect(component.canSelectStatus(DraftStatus.inProgress)).toBe(false);
    expect(component.statusDisabledReason(DraftStatus.inProgress)).toContain('pick position');
  });

  it('allows every status on an ordered roster that is not complete', () => {
    const component = componentFor(createDraft({ id: 1, status: DraftStatus.signup, draftMembers: orderedRoster }));

    expect(component.canSelectStatus(DraftStatus.locked)).toBe(true);
    expect(component.canSelectStatus(DraftStatus.inProgress)).toBe(true);
    expect(component.canSelectStatus(DraftStatus.complete)).toBe(true);
  });
});
