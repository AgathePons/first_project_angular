import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';

import { FormBuilderService } from '../../../shared/form-builder.service';

@Component({
  selector: 'app-stagaire-form',
  templateUrl: './stagaire-form.component.html',
  styleUrls: ['./stagaire-form.component.scss']
})
export class StagaireFormComponent implements OnInit {

  public stagiaireForm!: FormGroup;
  public addMode: boolean = true;
  public stagiaireTo!: Stagiaire;

  constructor(
    private stagiairesService: StagiaireService,
    private formBuilderService: FormBuilderService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(data);

    this.stagiaireForm = data.form;

    if (this.stagiaireForm.value.id !== undefined && this.stagiaireForm.value.id !== 0) {
      this.addMode =  false;
    } else {
      this.addMode = true;
    }
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
    console.log('delegate add/update stagiaire:', this.stagiaireForm.value);
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);

    let subscription: Observable<any>;

    if (this.addMode) {
      subscription = this.stagiairesService.addStagiaire(dto);
    } else {
      console.log('add update method in service');
      subscription = this.stagiairesService.updateStagiaire(dto);
    }
    subscription.subscribe((stagiaire: Stagiaire) => {
      this.stagiaireTo = stagiaire;
      this.goBack()
    });
  }

  public goBack(): void {
    this.router.navigate(['/', 'home']);
  }
}
