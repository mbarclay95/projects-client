import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToDeviceComponent } from './connect-to-device.component';

describe('ConnectToDeviceComponent', () => {
  let component: ConnectToDeviceComponent;
  let fixture: ComponentFixture<ConnectToDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectToDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectToDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
