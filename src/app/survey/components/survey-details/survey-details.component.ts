import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Survey } from 'src/app/core/models/survey';
import { SurveyService } from 'src/app/core/service/survey.service';
import { Question } from 'src/app/core/models/question';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Answer } from 'src/app/core/models/answer';
import { QuestionDto } from 'src/app/question/dto/question-dto';
import { QuestionService } from 'src/app/core/service/question.service';

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
  public showAddQuestionForm: boolean = false;
  public showGoToAnswerDiv: boolean = false;
  public questionTextToAdd: string = '';
  public questionAnswerTypeToAdd: string = '';
  public questionDtoToAdd!: QuestionDto;
  public answersToAdd: Array<Answer> = new Array<Answer>();
  public questionAddedFromForm: boolean = false;

  public questionForm!: FormGroup;
  public addMode: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router,
    private location: Location,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((routeParams: Params) => {
        const surveyId: number = routeParams['id'];
        this.surveyService.findOne(surveyId)
          .subscribe((survey: Survey) => {
            this.survey = survey;
            console.log('questions found >>', this.survey.getQuestions());
            this.survey.getQuestions().forEach((question: Question) => {
              this.questionArrayToShowDetails.push(question.getId())
            })
          });
          
      });

    


    const data: any = this.route.snapshot.data;

    this.questionForm = data.form;
    

    if (this.questionForm.value.id !== undefined && this.questionForm.value.id !== 0) {
      this.addMode = false;
    } else {
      this.addMode = true;
    }
  }

  public questionAdded(event: Survey): void {
    console.log(`Tut tut, change filter to ${event}`);
    this.survey = event;
    console.log('THIS SURVEY = ', this.survey);
    
    this.showGoToAnswerDiv = true;

    if (this.showAllAnswers === true) {
      this.survey.getQuestions().forEach((question: Question) => {
        this.questionArrayToShowDetails.push(question.getId())
      })
    }

  }

  public displayGoToAnswerDiv(event: boolean): void {
    this.showGoToAnswerDiv = event

    if (event == false) {
      this.questionAddedFromForm = true
    }
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
    if (poeType = 'ONE_MONTH') {

    }
  }

  public onDetailsQuestion(id: number) {
    this.questionArrayToShowDetails.push(id)
    console.log('ids = ', this.questionArrayToShowDetails)


  }
  public onDetailsQuestionOff(id: number) {

    console.log('Je supprime l id ', id);

    this.questionArrayToShowDetails.forEach((number) => {
      if (number === id) {
        this.questionArrayToShowDetails.splice(this.questionArrayToShowDetails.indexOf(number), 1)
      }
    })
    console.log('ids = ', this.questionArrayToShowDetails);


  }

  public onBackButton(): void {

    this.location.back();
  }

  public showAllAnswersBooleanState(input: boolean): void {


    if (input === true) {
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


  public addQuestionForm(boolean: boolean) {

    
    if (boolean == true) {
      this.showAddQuestionForm = true;
    } else {
      this.showAddQuestionForm = false;
      this.showGoToAnswerDiv = false;
      this.questionAddedFromForm = false;

    }
  }

  public onKey(event: any) {this.questionTextToAdd = event.target.value;}


  public onSubmitQuestion() {
    // this.questionToAdd.setText(this.questionTextToAdd)
    // this.questionToAdd.setAnswerType(this.questionAnswerTypeToAdd)


    console.log(this.questionAnswerTypeToAdd);
    console.log(this.questionTextToAdd);
    this.questionDtoToAdd.answerType = this.questionAnswerTypeToAdd
    this.questionDtoToAdd.text = this.questionTextToAdd
    console.log('this questionDtoToAdd = ', this.questionDtoToAdd);
    
  }

  public get c(): {[key: string]: AbstractControl} {
    return this.questionForm.controls;
  }

  public arrayQuestionSortedById(questions: Question[]): Question[] {
    this.questionService.sortById(questions)
    return questions
  }

  // Bouton OnEdit Answer

  public onEditAnswer(answer: Answer): void {
    this.router.navigate(['/', 'answer', 'update', answer.getId()]);
  }

  
}
