import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDragableComponent } from './question-dragable.component';

describe('QuestionDragableComponent', () => {
  let component: QuestionDragableComponent;
  let fixture: ComponentFixture<QuestionDragableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDragableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDragableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
