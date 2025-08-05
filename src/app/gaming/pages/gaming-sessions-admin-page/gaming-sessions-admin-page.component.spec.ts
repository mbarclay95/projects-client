import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingSessionsAdminPageComponent } from './gaming-sessions-admin-page.component';

describe('GamingSessionsAdminPageComponent', () => {
  let component: GamingSessionsAdminPageComponent;
  let fixture: ComponentFixture<GamingSessionsAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingSessionsAdminPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamingSessionsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
