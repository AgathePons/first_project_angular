import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyOrderAnswersComponent } from './survey-order-answers.component';

describe('SurveyOrderAnswersComponent', () => {
  let component: SurveyOrderAnswersComponent;
  let fixture: ComponentFixture<SurveyOrderAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyOrderAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyOrderAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
