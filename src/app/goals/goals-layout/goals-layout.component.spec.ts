import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsLayoutComponent } from './goals-layout.component';

describe('GoalsLayoutComponent', () => {
  let component: GoalsLayoutComponent;
  let fixture: ComponentFixture<GoalsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
