import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesPageComponent } from './families-page.component';

describe('FamiliesPageComponent', () => {
  let component: FamiliesPageComponent;
  let fixture: ComponentFixture<FamiliesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
