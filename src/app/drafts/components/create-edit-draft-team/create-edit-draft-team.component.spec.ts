import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDraftTeamComponent } from './create-edit-draft-team.component';

describe('CreateEditDraftTeamComponent', () => {
  let component: CreateEditDraftTeamComponent;
  let fixture: ComponentFixture<CreateEditDraftTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditDraftTeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditDraftTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
