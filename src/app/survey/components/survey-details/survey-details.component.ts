import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Survey } from 'src/app/core/models/survey';
import { SurveyService } from 'src/app/core/service/survey.service';
import { Question } from 'src/app/core/models/question';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

  public survey: Survey = new Survey();
  public question: Array<Question> = [];
  public questionArrayToShowDetails: Array<number> = [];
  public showAllAnswers: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      const surveyId: number = routeParams['id'];
      this.surveyService.findOne(surveyId)
      .subscribe((survey: Survey) => {
        this.survey = survey;
        console.log('answers of questions = ', this.survey.getQuestions());
        
        console.log('questions found >>', this.survey.getQuestions());
      });
    });
    console.log('getquestion of surv = ', this.survey.getQuestions());
    
  this.survey.getQuestions().forEach((question: Question) => {
    this.questionArrayToShowDetails.push(question.getId())
  })
  }

  public onDelete(question: Question) {
    this.surveyService.removeOneQuestion(this.survey.getId(), question.getId())
    .subscribe(
      (survey: Survey) => {
        this.survey = survey;
        this.question.splice(
          this.question.findIndex((s: Question) => s.getId() === question.getId()),
          1
        );
      }
    );
  }

  public convertPoeTypeToString(poeType: string) {
    if(poeType = 'ONE_MONTH') {
      
    }
  }
  
  public onDetailsQuestion(id: number) {
    this.questionArrayToShowDetails.push(id)
    console.log('ids = ', this.questionArrayToShowDetails)
    

  }
  public onDetailsQuestionOff(id: number) {

    console.log('Je supprime l id ', id);
    
    this.questionArrayToShowDetails.forEach((number) => {
      if(number === id) {
        this.questionArrayToShowDetails.splice(this.questionArrayToShowDetails.indexOf(number),1)
      }
    })
    console.log('ids = ', this.questionArrayToShowDetails);
    

  }

  public onBackButton(): void {
    
    this.location.back();
  }

  public showAllAnswersBooleanState(input: boolean): void {

    
    if(input === true) {
      this.survey.getQuestions().forEach((question) => {
        this.questionArrayToShowDetails.push(question.getId())
        console.log('add to questionasjddoj');
        
      })
    } else {
    this.questionArrayToShowDetails = []
    console.log('this question array =', this.questionArrayToShowDetails);

    }
    this.showAllAnswers = input
  }
}
