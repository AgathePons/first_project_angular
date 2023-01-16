import { Component, OnInit } from '@angular/core';
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

}
