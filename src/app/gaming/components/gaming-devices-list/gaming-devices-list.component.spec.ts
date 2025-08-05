import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingDevicesListComponent } from './gaming-devices-list.component';

describe('GamingDevicesListComponent', () => {
  let component: GamingDevicesListComponent;
  let fixture: ComponentFixture<GamingDevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingDevicesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamingDevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
