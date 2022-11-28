import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public getForm(): FormGroup {
    return this.form;
  }

  public build(): FormBuilderService {
    this.form = this.formBuilder.group({
      lastName: [
        '', // default alue
        [Validators.required]
      ],
      firstName: [
        '',
        [Validators.required]
      ],
      email: [
        '',
        [Validators.required]
      ],
      phoneNumber: [
        '',
        [Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]
      ],
      birthDate: [
        '',
      ]
    });
    return this;
  }
}
