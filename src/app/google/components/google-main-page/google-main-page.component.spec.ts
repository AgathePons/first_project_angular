import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMainPageComponent } from './google-main-page.component';

describe('GoogleMainPageComponent', () => {
  let component: GoogleMainPageComponent;
  let fixture: ComponentFixture<GoogleMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
