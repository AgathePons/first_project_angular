import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-stagaire-form',
  templateUrl: './stagaire-form.component.html',
  styleUrls: ['./stagaire-form.component.scss']
})
export class StagaireFormComponent implements OnInit {

  //stagiaire: Stagiaire = new Stagiaire();
  stagiaireForm!: FormGroup;

  constructor(
    private stagiairesService: StagiaireService,
    private formBuilderService: FormBuilderService,
  ) { }

  ngOnInit(): void {
    this.stagiaireForm = this.formBuilderService.build().getForm();
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
