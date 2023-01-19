import { CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Question } from 'src/app/core/models/question';
import { Survey } from 'src/app/core/models/survey';
import { QuestionService } from 'src/app/core/service/question.service';
import { SurveyService } from 'src/app/core/service/survey.service';
import { QuestionDto } from 'src/app/question/dto/question-dto';

@Component({
  selector: 'app-survey-order-questions',
  templateUrl: './survey-order-questions.component.html',
  styleUrls: ['./survey-order-questions.component.scss']
})
export class SurveyOrderQuestionsComponent implements OnInit {

  public survey!: Survey;
  public currentListOrdered!: Array<Question>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private surveyService: SurveyService,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (routeParams: Params) => {
        const surveyId: number = routeParams['id'];
        this.surveyService.findOne(surveyId).subscribe(
          ((survey: Survey) => {
            this.survey = survey;
            this.currentListOrdered = survey.getQuestions();
          })
        );
      }
    );
  }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.currentListOrdered, event.previousIndex, event.currentIndex);
    this.currentListOrdered.forEach((question: Question, index) => {
      question.setOrderInSurvey(index);
    });
  }

  dragEnd($event: CdkDragEnd) {
  }

  public onSubmit(): void {
    this.currentListOrdered.forEach((question: Question) => {
      const dto: QuestionDto = new QuestionDto(question);
      console.log('dto', dto);
      this.questionService.updateQuestion(dto).subscribe();
    });
    this.goBack();
  }

  public goBack(): void {
    this.location.back()
  }

}
