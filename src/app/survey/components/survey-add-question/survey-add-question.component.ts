import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from 'src/app/core/models/question';
import { Survey } from 'src/app/core/models/survey';
import { QuestionService } from 'src/app/core/service/question.service';
import { SurveyService } from 'src/app/core/service/survey.service';

@Component({
  selector: 'app-survey-add-question',
  templateUrl: './survey-add-question.component.html',
  styleUrls: ['./survey-add-question.component.scss']
})
export class SurveyAddQuestionComponent implements OnInit {

  public survey: Survey = new Survey();
  public questions: Array<Question> = [];
  public allQuestions: Array<Question> = [];
  public questionsIdToAdd: Array<number> = [];
  public questionsToAdd: Array<Question> = [];

  filter = false;
  filterFN = '';
  filterLN = '';

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private questionService: QuestionService,
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
            this.questionService.findAll().subscribe((questions: Question[]) => {
              // all stagiaires
              const allQuestions = questions;
              // filtered stagiaires
              const filteredQuestions = allQuestions.filter((questionToCheck: Question) => {
                return !this.survey.getQuestions().find(elem => elem.getId() === questionToCheck.getId());
              });
              this.questions = filteredQuestions;
              this.questionService.sortById(this.questions);
              this.allQuestions = this.questions
            });
          });
      });
  }

  public onListSelectionChange(obj: MatSelectionListChange): void {
    const seletedObj: Array<any> = obj.source.selectedOptions.selected

    this.questionsToAdd = seletedObj.map(questionInSelection => questionInSelection.value);
    console.log('>> stagiaire to add:', this.questionsToAdd);
  
  }

  public questionsToIDArray(): Array<number> {
    this.questionsToAdd.forEach((question) => {
      this.questionsIdToAdd.push(question.getId())
    })
    return this.questionsIdToAdd
  }

  public onAddManyQuestions(): void {
    console.log('onAddManyQuestions');
    this.surveyService.addManyQuestions(this.survey.getId(), this.questionsToIDArray()).subscribe((survey: Survey) => {
      this.survey = survey;
      this.router.navigate(['/', 'survey', 'detail', this.survey.getId()]);
    });
  }

  public onBackButton(): void {
    this.location.back();
  }

  changeBooleanState() {
    console.log('changebutton call');

    if (this.filter) { this.filter = false }
    else {
      this.filter = true
    }
  }

  resetFilter(): void {
    this.filterFN = '';
    this.filterLN = '';
    this.questions = this.allQuestions
  }

}
