import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiairePoeFormComponent } from './stagiaire-poe-form.component';

describe('StagiairePoeFormComponent', () => {
  let component: StagiairePoeFormComponent;
  let fixture: ComponentFixture<StagiairePoeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiairePoeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiairePoeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
