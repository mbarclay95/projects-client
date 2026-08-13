import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftFireworksComponent } from './draft-fireworks.component';

describe('DraftFireworksComponent', () => {
  let component: DraftFireworksComponent;
  let fixture: ComponentFixture<DraftFireworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftFireworksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftFireworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
