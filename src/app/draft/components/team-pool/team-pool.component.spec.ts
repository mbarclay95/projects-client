import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mock, vi } from 'vitest';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzImageService } from 'ng-zorro-antd/image';
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
  let draftServiceSpy: { makePick: Mock; getToken: Mock };
  let me$: BehaviorSubject<DraftCache | undefined>;

  const theOnlyTeam = createDraftTeam({ id: 5, name: 'Team A' });

  beforeEach(async () => {
    draftServiceSpy = {
      makePick: vi.fn().mockResolvedValue(undefined),
      getToken: vi.fn().mockReturnValue('tok'),
    };

    me$ = new BehaviorSubject<DraftCache | undefined>({ draftId: 1, draftMemberId: 34, name: 'Mike', secret: 'aB3' });

    await TestBed.configureTestingModule({
      imports: [TeamPoolComponent],
      providers: [
        { provide: DraftService, useValue: draftServiceSpy },
        { provide: DraftCacheService, useValue: { me$: me$.asObservable(), isMyTurn$: me$.asObservable() } },
        { provide: NzMessageService, useValue: { error: vi.fn() } },
        { provide: NzModalService, useValue: { confirm: vi.fn() } },
        { provide: NzImageService, useValue: { preview: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPoolComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('draft', createDraft({ id: 1, draftTeams: [theOnlyTeam], draftPicks: [] }));
    fixture.detectChanges();
  });

  it('does not make a pick when it is not your turn', async () => {
    await component.pick(theOnlyTeam, false);

    expect(draftServiceSpy.makePick).not.toHaveBeenCalled();
  });

  it('does not make a pick for an already-taken team', async () => {
    fixture.componentRef.setInput(
      'draft',
      createDraft({
        id: 1,
        draftTeams: [theOnlyTeam],
        draftPicks: [createDraftPick({ id: 1, draftTeamId: 5, draftMemberId: 99, pickNumber: 1 })],
      }),
    );

    await component.pick(theOnlyTeam, true);

    expect(draftServiceSpy.makePick).not.toHaveBeenCalled();
  });

  it('makes a pick when it is your turn and the team is unpicked', async () => {
    await component.pick(theOnlyTeam, true);

    expect(draftServiceSpy.makePick).toHaveBeenCalledWith(5, 'aB3');
  });
});
