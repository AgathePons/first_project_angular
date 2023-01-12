import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Survey } from 'src/app/core/models/survey';
import { SurveyService } from 'src/app/core/service/survey.service';
import { FormBuilderService } from 'src/app/shared/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyResolver implements Resolve<FormGroup> {

  public constructor(
    private surveyService: SurveyService,
    private formBuilderService: FormBuilderService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<FormGroup> {
    const id: number = +route.paramMap.get('id')!;
    console.log('Resolver >> got id:', id);
    let survey: Survey;
    let form: FormGroup;
    if (id === 0) {
      survey = new Survey();
      form = this.formBuilderService.buildSurvey(survey).getForm();
      return of(form);
    } else {
      return this.surveyService.findOne(id)
      .pipe(
        take(1),
        map((oSurvey: Survey) => {
          return this.formBuilderService.buildSurvey(oSurvey).getForm();
        })
      );
    }
  }
}
