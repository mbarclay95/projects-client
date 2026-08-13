import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DraftService } from './draft.service';
import { environment } from '../../../environments/environment';
import { DraftStatus } from '../models/draft.model';

describe('DraftService', () => {
  let service: DraftService;
  let httpMock: HttpTestingController;

  const url = `${environment.publicApiUrl}/drafts/12?token=tok`;

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(DraftService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.useRealTimers();
  });

  it('polls every 2s while in_progress and stops once the status leaves in_progress', async () => {
    const loaded = service.getDraft('12', 'tok');
    httpMock.expectOne(url).flush(inProgressDraft());
    await loaded;

    // timer(0, 2000)'s immediate tick, fired by the status transition to in_progress.
    await vi.advanceTimersByTimeAsync(0);
    httpMock.expectOne(url).flush(inProgressDraft());

    // The next 2s tick.
    await vi.advanceTimersByTimeAsync(2000);
    httpMock.expectOne(url).flush(completeDraft());
    await vi.advanceTimersByTimeAsync(0);

    // No further request once status has left in_progress.
    await vi.advanceTimersByTimeAsync(2000);
    httpMock.expectNone(url);
  });

  function inProgressDraft() {
    return {
      id: 12,
      name: 'Summer Cup Draft',
      status: DraftStatus.inProgress,
      totalRounds: 1,
      currentRound: 1,
      currentPickNumber: 1,
      draftTeams: [],
      draftMembers: [],
      draftPicks: [],
    };
  }

  function completeDraft() {
    return { ...inProgressDraft(), status: DraftStatus.complete };
  }
});
