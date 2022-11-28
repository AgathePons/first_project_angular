import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';
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
    console.log('delegate add stagiaire:', this.stagiaireForm.value);
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);
    this.stagiairesService.addStagiaire(dto);
  }

}
