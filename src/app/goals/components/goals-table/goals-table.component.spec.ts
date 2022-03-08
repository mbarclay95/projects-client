import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsTableComponent } from './goals-table.component';

describe('GoalsTableComponent', () => {
  let component: GoalsTableComponent;
  let fixture: ComponentFixture<GoalsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
