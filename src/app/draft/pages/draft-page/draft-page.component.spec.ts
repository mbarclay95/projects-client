import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { vi } from 'vitest';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { DraftPageComponent } from './draft-page.component';

describe('DraftPageComponent', () => {
  let refs: { close: ReturnType<typeof vi.fn>; afterClose: Subject<void> }[];
  let modalInfo: ReturnType<typeof vi.fn>;
  let component: DraftPageComponent;

  beforeEach(() => {
    refs = [];
    modalInfo = vi.fn(() => {
      const ref = { close: vi.fn(), afterClose: new Subject<void>() };
      refs.push(ref);
      return ref;
    });

    TestBed.configureTestingModule({
      imports: [DraftPageComponent],
      providers: [
        { provide: DraftService, useValue: { draft$: of(undefined), getToken: () => '' } },
        {
          provide: DraftCacheService,
          useValue: {
            me$: of(undefined),
            isMyTurn$: of(false),
            staleIdentity$: of(false),
            hasCelebrated: vi.fn(),
            markCelebrated: vi.fn(),
            clearCelebrated: vi.fn(),
          },
        },
        { provide: NzMessageService, useValue: { info: vi.fn() } },
      ],
    });
    TestBed.overrideProvider(NzModalService, { useValue: { info: modalInfo } });

    component = TestBed.createComponent(DraftPageComponent).componentInstance;
  });

  it('opens the your-turn modal when the turn arrives', () => {
    component.onMyTurnChanged(true);

    expect(modalInfo).toHaveBeenCalledTimes(1);
    expect(modalInfo.mock.calls[0][0].nzTitle).toBe("It's your turn!");
  });

  it('does not open a second modal while one is held', () => {
    component.onMyTurnChanged(true);
    component.onMyTurnChanged(true);

    expect(modalInfo).toHaveBeenCalledTimes(1);
  });

  it('closes the held modal when the turn moves on', () => {
    component.onMyTurnChanged(true);
    component.onMyTurnChanged(false);

    expect(refs[0].close).toHaveBeenCalledTimes(1);
  });

  it('opens a new modal after the previous one was dismissed', () => {
    component.onMyTurnChanged(true);
    refs[0].afterClose.next();
    component.onMyTurnChanged(true);

    expect(modalInfo).toHaveBeenCalledTimes(2);
  });
});
