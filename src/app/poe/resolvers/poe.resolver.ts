import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/service/poe.service';
import { FormBuilderService } from 'src/app/shared/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class PoeResolver implements Resolve<FormGroup> {

  public constructor(
    private route: ActivatedRoute,
    private poeService: PoeService,
    private formBuilderService: FormBuilderService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {
    const id: number = +route.paramMap.get('id')!;
    console.log('poe Resolver >> got id:', id);
    let poe: Poe;
    let form: FormGroup;
    if (id === 0) {
      console.log('id = 0 : addMode');
      poe = new Poe();
      form = this.formBuilderService.buildPoe(poe).getForm();
      return of(form);
    } else {
      console.log('id != 0 : updateMode');
      return this.poeService.findOne(id)
        .pipe(
          take(1),
          map((oPoe: Poe) => {
            return this.formBuilderService.buildPoe(oPoe).getForm();
          })
        );
    }
  }

}
