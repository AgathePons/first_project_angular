import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeAddStagiaireComponent } from './poe-add-stagiaire.component';

describe('PoeAddStagiaireComponent', () => {
  let component: PoeAddStagiaireComponent;
  let fixture: ComponentFixture<PoeAddStagiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeAddStagiaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeAddStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
