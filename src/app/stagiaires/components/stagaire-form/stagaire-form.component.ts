import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  public stagiaireForm!: FormGroup;
  public addMode: boolean = true;

  constructor(
    private stagiairesService: StagiaireService,
    private formBuilderService: FormBuilderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    // console.log(this.router.url);
    // console.log(this.activatedRoute.url);
    this.activatedRoute.url.subscribe((url: UrlSegment[]) => {
      //console.log(url);
      if (url.filter((urlSegment: UrlSegment) => urlSegment.path === 'update').length
      ) {
        console.log('mode update');
        this.addMode = false;
        this.stagiairesService.findOne(+url[url.length - 1].path) // put a '+' before to parseInt
          .subscribe((stagiaire: Stagiaire) => {
            console.log(`stagiaire: ${stagiaire.getFirstName()} ${stagiaire.getLastName()} (${stagiaire.getId()})`);
            this.stagiaireForm = this.formBuilderService.build(stagiaire).getForm();
          })

      } else {
        console.log('mode ajout');
        this.stagiaireForm = this.formBuilderService.build(new Stagiaire()).getForm();
      }
    });
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
    subscription.subscribe(() => this.goHome());
  }

  public goHome(): void {
    this.router.navigate(['/', 'home']);
  }
}
