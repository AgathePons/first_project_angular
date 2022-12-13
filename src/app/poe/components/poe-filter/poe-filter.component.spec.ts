import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeFilterComponent } from './poe-filter.component';

describe('PoeFilterComponent', () => {
  let component: PoeFilterComponent;
  let fixture: ComponentFixture<PoeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
