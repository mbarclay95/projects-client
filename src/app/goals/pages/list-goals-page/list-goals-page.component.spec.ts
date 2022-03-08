import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoalsPageComponent } from './list-goals-page.component';

describe('ListGoalsPageComponent', () => {
  let component: ListGoalsPageComponent;
  let fixture: ComponentFixture<ListGoalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGoalsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGoalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
