import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/app/core/models/answer';
import { AnswerService } from 'src/app/core/service/answer.service';
import { Observable } from 'rxjs';
import { AnswerDto } from '../../dto/answer-dto';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

  public answerForm!: FormGroup;
  public addMode: boolean = true;
  public answer!: Answer;

  constructor(
    private answerService: AnswerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(data.form);
    this.answerForm = data.form;

    if (this.answerForm.value.id !== undefined && this.answerForm.value.id !== 0) {
      console.log('addMode false');
      this.addMode = false;
    } else {
      console.log('addMode true');
      this.addMode = true;
    }
  }

  public onSubmit(): void {
    const dto: AnswerDto = new AnswerDto(this.answerForm.value);
    let subscription: Observable<any>;

    if(this.addMode) {
      subscription = this.answerService.addAnswer(dto);
    } else {
      subscription = this.answerService.updateAnswer(dto);
    }
    subscription.subscribe((answer: Answer) => {
      this.answer = answer;
      this.goBack();
    })

  }

  public goBack(): void {
  this.router.navigate(['/', 'answers']);
  }

  public get c(): {[key: string]: AbstractControl} {
    return this.answerForm.controls;
}

}
