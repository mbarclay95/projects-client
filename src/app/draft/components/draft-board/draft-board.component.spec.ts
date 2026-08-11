import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftBoardComponent } from './draft-board.component';
import { createDraft } from '../../models/draft.model';

describe('DraftBoardComponent', () => {
  let component: DraftBoardComponent;
  let fixture: ComponentFixture<DraftBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftBoardComponent);
    component = fixture.componentInstance;
    component.draft = createDraft({ id: 1 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
