import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DraftPageComponent } from './draft-page.component';

describe('DraftPageComponent', () => {
  let component: DraftPageComponent;
  let fixture: ComponentFixture<DraftPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
