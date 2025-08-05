import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingSessionViewPageComponent } from './gaming-session-view-page.component';

describe('GamingSessionViewPageComponent', () => {
  let component: GamingSessionViewPageComponent;
  let fixture: ComponentFixture<GamingSessionViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingSessionViewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamingSessionViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
