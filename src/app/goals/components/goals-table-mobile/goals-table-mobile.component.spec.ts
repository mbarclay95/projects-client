import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsTableMobileComponent } from './goals-table-mobile.component';

describe('GoalsTableMobileComponent', () => {
  let component: GoalsTableMobileComponent;
  let fixture: ComponentFixture<GoalsTableMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsTableMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsTableMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
