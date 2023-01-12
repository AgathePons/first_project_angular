import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';
import { FormBuilderService } from '../../shared/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class StagiaireResolver implements Resolve<FormGroup> {
  public constructor(
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService,
    private formBuilderService: FormBuilderService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<FormGroup> {
    const id: number = +route.paramMap.get('id')!;
    console.log('Resolver >> got id:', id);
    let stagiaire: Stagiaire;
    let form: FormGroup;
    if (id === 0) {
      stagiaire = new Stagiaire();
      form = this.formBuilderService.build(stagiaire).getForm();

      return of(form);
    } else {
      return this.stagiaireService.findOne(id)
        .pipe(
          take(1),
          map((ostagiaire: Stagiaire) => {
            return this.formBuilderService.build(ostagiaire).getForm();
          })
        );
    }
  }
}
