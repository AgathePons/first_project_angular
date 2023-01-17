import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTokenFormComponent } from './google-token-form.component';

describe('GoogleTokenFormComponent', () => {
  let component: GoogleTokenFormComponent;
  let fixture: ComponentFixture<GoogleTokenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleTokenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
