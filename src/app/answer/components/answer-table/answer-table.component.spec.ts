import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerTableComponent } from './answer-table.component';

describe('AnswerTableComponent', () => {
  let component: AnswerTableComponent;
  let fixture: ComponentFixture<AnswerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
