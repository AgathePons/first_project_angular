import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyOrderQuestionsComponent } from './survey-order-questions.component';

describe('SurveyOrderQuestionsComponent', () => {
  let component: SurveyOrderQuestionsComponent;
  let fixture: ComponentFixture<SurveyOrderQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyOrderQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyOrderQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
