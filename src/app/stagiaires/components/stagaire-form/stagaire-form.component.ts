import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stagaire-form',
  templateUrl: './stagaire-form.component.html',
  styleUrls: ['./stagaire-form.component.scss']
})
export class StagaireFormComponent implements OnInit {

  stagiaireForm: FormGroup = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  email: new FormControl(''),
  phoneNumber: new FormControl(''),
  birthDate: new FormControl(''),
  });

  /* firstName: FormControl = new FormControl('');
  lastName: FormControl = new FormControl('');
  email: FormControl = new FormControl('');
  phoneNumber: FormControl = new FormControl('');
  birthDate: FormControl = new FormControl(''); */

  constructor() { }

  ngOnInit(): void {
  }

}
