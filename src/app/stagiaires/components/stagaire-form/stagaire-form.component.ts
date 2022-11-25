import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';

@Component({
  selector: 'app-stagaire-form',
  templateUrl: './stagaire-form.component.html',
  styleUrls: ['./stagaire-form.component.scss']
})
export class StagaireFormComponent implements OnInit {

  stagiaire: Stagiaire = new Stagiaire();

  stagiaireForm: FormGroup = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required ),
  email: new FormControl('', [Validators.email , Validators.required]),
  phoneNumber: new FormControl(null, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")),
  birthDate: new FormControl(null),
  });

  constructor(
    private stagiairesService: StagiaireService,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    // TODO: use EventEmitter with form value
    console.log('pif paf pouf', this.stagiaireForm.value);
    const stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setFirstName(this.stagiaireForm.value.firstName);
    stagiaire.setLastName(this.stagiaireForm.value.lastName);
    stagiaire.setEmail(this.stagiaireForm.value.email);
    stagiaire.setPhoneNumber(this.stagiaireForm.value.phoneNumber);
    if (this.stagiaireForm.value.birthDate !== null) {
      stagiaire.setBirthDate(new Date(this.stagiaireForm.value.birthDate));
    }
    this.stagiairesService.addStagiaire(stagiaire);
  }

}
