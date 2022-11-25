import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stagaire-form',
  templateUrl: './stagaire-form.component.html',
  styleUrls: ['./stagaire-form.component.scss']
})
export class StagaireFormComponent implements OnInit {

  stagiaireForm: FormGroup = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required ),
  email: new FormControl('', [Validators.email , Validators.required]),
  phoneNumber: new FormControl('', Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")),
  birthDate: new FormControl(null),
  });

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    console.log('pif paf pouf', this.stagiaireForm.value);

  }

}
