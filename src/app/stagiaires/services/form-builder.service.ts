import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;
  private stagiaire: Stagiaire = new Stagiaire();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public getForm(): FormGroup {
    return this.form;
  }

  public build(): FormBuilderService {
    this.form = this.formBuilder.group({
      lastName: [
        this.stagiaire.getLastName(), // default alue
        [Validators.required]
      ],
      firstName: [
        this.stagiaire.getFirstName(),
        [Validators.required]
      ],
      email: [
        this.stagiaire.getEmail(),
        [Validators.required, Validators.email]
      ],
      phoneNumber: [
        this.stagiaire.getPhoneNumber(),
        [Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]
      ],
      birthDate: [
        this.stagiaire.getBirthDate(),
      ]
    });
    return this;
  }
}
