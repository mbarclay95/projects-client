import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneDraftTeamsModalComponent } from './clone-draft-teams-modal.component';

describe('CloneDraftTeamsModalComponent', () => {
  let component: CloneDraftTeamsModalComponent;
  let fixture: ComponentFixture<CloneDraftTeamsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloneDraftTeamsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CloneDraftTeamsModalComponent);
    component = fixture.componentInstance;
    component.draftId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
