import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeTableComponent } from './poe-table.component';

describe('PoeTableComponent', () => {
  let component: PoeTableComponent;
  let fixture: ComponentFixture<PoeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
