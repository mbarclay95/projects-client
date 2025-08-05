import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberStatsComponent } from './family-member-stats.component';

describe('FamilyMemberStatsComponent', () => {
  let component: FamilyMemberStatsComponent;
  let fixture: ComponentFixture<FamilyMemberStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyMemberStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyMemberStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
