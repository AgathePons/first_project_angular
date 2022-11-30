import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

    private router: Router,

  ) { }

  ngOnInit(): void {
    this.stagiaireForm = this.formBuilderService.build().getForm();

  }

  // method helper
  /**
   * returns a list of form controls
   * @usage in template: c['lastName']
   * instead of stagiaireForm
   */
  public get c(): {[key: string]: AbstractControl} {
    return this.stagiaireForm.controls;

  }

  public onSubmit(): void {
    console.log('delegate add stagiaire:', this.stagiaireForm.value);
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);
    this.stagiairesService.addStagiaire(dto)
      .subscribe(() => {
        this.goHome();
      })
  }

  public goHome(): void {
    this.router.navigate(['/', 'home']);
  }

}
