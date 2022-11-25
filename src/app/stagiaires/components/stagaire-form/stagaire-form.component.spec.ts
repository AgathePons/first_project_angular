import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagaireFormComponent } from './stagaire-form.component';

describe('StagaireFormComponent', () => {
  let component: StagaireFormComponent;
  let fixture: ComponentFixture<StagaireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagaireFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
