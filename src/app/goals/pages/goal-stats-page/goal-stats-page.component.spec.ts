import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalStatsPageComponent } from './goal-stats-page.component';

describe('GoalStatsPageComponent', () => {
  let component: GoalStatsPageComponent;
  let fixture: ComponentFixture<GoalStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalStatsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
