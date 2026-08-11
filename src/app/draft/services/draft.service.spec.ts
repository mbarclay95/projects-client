import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DraftService } from './draft.service';
import { environment } from '../../../environments/environment';
import { DraftStatus } from '../models/draft.model';

describe('DraftService', () => {
  let service: DraftService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(DraftService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('polls every 2s while in_progress and stops once the status leaves in_progress', fakeAsync(() => {
    service.getDraft('12', 'tok');
    httpMock.expectOne(`${environment.publicApiUrl}/drafts/12?token=tok`).flush(inProgressDraft());
    tick();

    // timer(0, 2000)'s immediate tick, fired by the status transition to in_progress.
    httpMock.expectOne(`${environment.publicApiUrl}/drafts/12?token=tok`).flush(inProgressDraft());
    tick();

    // The next 2s tick.
    tick(2000);
    httpMock.expectOne(`${environment.publicApiUrl}/drafts/12?token=tok`).flush(completeDraft());
    tick();

    // No further request once status has left in_progress.
    tick(2000);
    httpMock.expectNone(`${environment.publicApiUrl}/drafts/12?token=tok`);
  }));

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
