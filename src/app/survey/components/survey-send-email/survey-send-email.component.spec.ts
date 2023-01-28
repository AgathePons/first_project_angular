import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySendEmailComponent } from './survey-send-email.component';

describe('SurveySendEmailComponent', () => {
  let component: SurveySendEmailComponent;
  let fixture: ComponentFixture<SurveySendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveySendEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
