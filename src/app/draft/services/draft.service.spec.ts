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

  it('polls every 2s through signup, locked and in_progress and stops at complete', async () => {
    const loaded = service.getDraft('12', 'tok');
    httpMock.expectOne(url).flush(draftWith(DraftStatus.signup));
    await loaded;

    await vi.advanceTimersByTimeAsync(0);
    httpMock.expectOne(url).flush(draftWith(DraftStatus.signup));

    // A status change restarts the timer, so its immediate tick follows.
    await vi.advanceTimersByTimeAsync(2000);
    httpMock.expectOne(url).flush(draftWith(DraftStatus.locked));
    await vi.advanceTimersByTimeAsync(0);
    httpMock.expectOne(url).flush(draftWith(DraftStatus.locked));

    await vi.advanceTimersByTimeAsync(2000);
    httpMock.expectOne(url).flush(draftWith(DraftStatus.inProgress));
    await vi.advanceTimersByTimeAsync(0);
    httpMock.expectOne(url).flush(draftWith(DraftStatus.inProgress));

    await vi.advanceTimersByTimeAsync(2000);
    httpMock.expectOne(url).flush(draftWith(DraftStatus.complete));
    await vi.advanceTimersByTimeAsync(0);

    await vi.advanceTimersByTimeAsync(2000);
    httpMock.expectNone(url);
  });

  it('makes no request of its own before the first load resolves', async () => {
    const loaded = service.getDraft('12', 'tok');
    await vi.advanceTimersByTimeAsync(4000);
    httpMock.expectOne(url).flush(draftWith(DraftStatus.complete));
    await loaded;
  });

  it('does not poll after the first load fails', async () => {
    const loaded = service.getDraft('12', 'tok').catch(() => undefined);
    httpMock.expectOne(url).flush(null, { status: 404, statusText: 'Not Found' });
    await loaded;

    await vi.advanceTimersByTimeAsync(4000);
    httpMock.expectNone(url);
  });

  function draftWith(status: DraftStatus) {
    return {
      id: 12,
      name: 'Summer Cup Draft',
      status,
      totalRounds: 1,
      currentRound: 1,
      currentPickNumber: 1,
      draftTeams: [],
      draftMembers: [],
      draftPicks: [],
    };
  }
});
