import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Answer } from 'src/app/core/models/answer';
import { AnswerService } from 'src/app/core/service/answer.service';
import { FormBuilderService } from 'src/app/shared/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerResolver implements Resolve<FormGroup> {
  public constructor(
    private answerService: AnswerService,
    private formBuilderService: FormBuilderService,
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {
    const id: number = +route.paramMap.get('id')!;
    console.log('Resolver >> got id:', id);
    let answer: Answer;
    let form: FormGroup;
    if (id === 0) {
      answer = new Answer();
      form = this.formBuilderService.buildAnswer(answer).getForm();
      return of(form);
    } else {
      return this.answerService.findOne(id)
      .pipe(
        take(1),
        map((oAnswer: Answer) => {
          return this.formBuilderService.buildAnswer(oAnswer).getForm();
        })
      );
    }
  }
}
