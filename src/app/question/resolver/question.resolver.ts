import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/service/question.service';
import { FormBuilderService } from 'src/app/shared/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolver implements Resolve<FormGroup> {

  public constructor(
    private questionService: QuestionService,
    private formBuilderService: FormBuilderService,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {
    const id: number = +route.paramMap.get('id')!;
    console.log('Resolver >> got id:', id);
    let question: Question;
    let form: FormGroup;
    if (id === 0) {
      question = new Question();
      form = this.formBuilderService.buildQuestion(question).getForm();
      return of(form);
    } else {
      return this.questionService.findOne(id)
      .pipe(
        take(1),
        map((oQuestion: Question) => {
          return this.formBuilderService.buildQuestion(oQuestion).getForm();
        })
      );
    }
  }
  }

