import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/core/models/question';
import { QuestionService } from 'src/app/core/service/question.service';
import { QuestionDto } from '../../dto/question-dto';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  public questionForm!: FormGroup;
  public addMode: boolean = true;
  public question!: Question;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(data.form);
    this.questionForm = data.form;

    if (this.questionForm.value.id !== undefined && this.questionForm.value.id !== 0) {
      this.addMode = false;
    } else {
      this.addMode = true;
    }
  }

  public onSubmit(): void {
    const dto: QuestionDto = new QuestionDto(this.questionForm.value);
    let subscription: Observable<any>;

    if(this.addMode) {
      subscription = this.questionService.addQuestion(dto);
    } else {
      subscription = this.questionService.updateQuestion(dto);
    }
    subscription.subscribe((question: Question) => {
      this.question = question;
      this.goBack();
    })
  }

  public goBack(): void {
    this.router.navigate(['/', 'questions']);
  }

  public get c(): {[key: string]: AbstractControl} {
    return this.questionForm.controls;
  }
  }

