import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMembersTabComponent } from './draft-members-tab.component';
import { createDraft } from '../../models/draft.model';

describe('DraftMembersTabComponent', () => {
  let component: DraftMembersTabComponent;
  let fixture: ComponentFixture<DraftMembersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftMembersTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftMembersTabComponent);
    component = fixture.componentInstance;
    component.draft = createDraft({ id: 1 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
