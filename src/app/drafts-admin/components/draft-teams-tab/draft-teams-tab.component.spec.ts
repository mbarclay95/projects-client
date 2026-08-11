import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftTeamsTabComponent } from './draft-teams-tab.component';
import { createDraft } from '../../models/draft.model';

describe('DraftTeamsTabComponent', () => {
  let component: DraftTeamsTabComponent;
  let fixture: ComponentFixture<DraftTeamsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftTeamsTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftTeamsTabComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('draft', createDraft({ id: 1 }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
