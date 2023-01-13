import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireTestComponent } from './stagiaire-test.component';

describe('StagiaireTestComponent', () => {
  let component: StagiaireTestComponent;
  let fixture: ComponentFixture<StagiaireTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
