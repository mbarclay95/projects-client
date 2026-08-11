import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TeamPoolComponent } from './team-pool.component';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { createDraft } from '../../models/draft.model';
import { createDraftTeam } from '../../models/draft-team.model';
import { createDraftPick } from '../../models/draft-pick.model';
import { DraftCache } from '../../models/draft-cache.model';

describe('TeamPoolComponent', () => {
  let component: TeamPoolComponent;
  let fixture: ComponentFixture<TeamPoolComponent>;
  let draftServiceSpy: jasmine.SpyObj<Pick<DraftService, 'makePick' | 'getToken'>>;
  let me$: BehaviorSubject<DraftCache | undefined>;

  const theOnlyTeam = createDraftTeam({ id: 5, name: 'Team A' });

  beforeEach(async () => {
    draftServiceSpy = jasmine.createSpyObj('DraftService', ['makePick', 'getToken']);
    draftServiceSpy.makePick.and.resolveTo(undefined);
    draftServiceSpy.getToken.and.returnValue('tok');

    me$ = new BehaviorSubject<DraftCache | undefined>({ draftId: 1, draftMemberId: 34, name: 'Mike', secret: 'aB3' });

    await TestBed.configureTestingModule({
      imports: [TeamPoolComponent],
      providers: [
        { provide: DraftService, useValue: draftServiceSpy },
        { provide: DraftCacheService, useValue: { me$: me$.asObservable(), isMyTurn$: me$.asObservable() } },
        { provide: NzMessageService, useValue: jasmine.createSpyObj('NzMessageService', ['error']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPoolComponent);
    component = fixture.componentInstance;
    component.draft = createDraft({ id: 1, draftTeams: [theOnlyTeam], draftPicks: [] });
    fixture.detectChanges();
  });

  it('does not make a pick when it is not your turn', async () => {
    await component.pick(theOnlyTeam, false);

    expect(draftServiceSpy.makePick).not.toHaveBeenCalled();
  });

  it('does not make a pick for an already-taken team', async () => {
    component.draft = createDraft({
      id: 1,
      draftTeams: [theOnlyTeam],
      draftPicks: [createDraftPick({ id: 1, draftTeamId: 5, draftMemberId: 99, pickNumber: 1 })],
    });

    await component.pick(theOnlyTeam, true);

    expect(draftServiceSpy.makePick).not.toHaveBeenCalled();
  });

  it('makes a pick when it is your turn and the team is unpicked', async () => {
    await component.pick(theOnlyTeam, true);

    expect(draftServiceSpy.makePick).toHaveBeenCalledWith(5, 'aB3');
  });
});
