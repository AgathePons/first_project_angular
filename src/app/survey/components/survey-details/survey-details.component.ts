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
import { QuestionInputDto } from 'src/app/question/dto/question-input-dto';
import { AnswerService } from 'src/app/core/service/answer.service';
import { AnswerInputDto } from 'src/app/answer/dto/answer-input-dto';
import { AnswerDto } from 'src/app/answer/dto/answer-dto';
import { AnswerUpdateDto } from 'src/app/answer/dto/answer-update-dto';

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

  public inputQuestion: string = ''; // attribut qui recoit la valeur de l'input d'edit du texte d'une question
  public inputQuestionMap: Map<number, string> = new Map<number, string>();
  public inputAnswerMap: Map<number, string> = new Map<number, string>();

  public inputNewAnswer: string = '';
  public inputUpdateAnswer: string = '';

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router,
    private location: Location,
    private questionService: QuestionService,
    private answerService: AnswerService
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
            // reinitialise la map avec les ID des questions et un string vide ''

            this.survey.getQuestions().forEach((question: Question) => {
              this.inputQuestionMap.set(question.getId(), '');
              this.inputAnswerMap.set(question.getId(), '');

             
            }
            )

            console.log('Map = ', this.inputQuestionMap);
            console.log('Map Answer = ', this.inputAnswerMap);
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

  public onEdit(question: Question): void {
    this.router.navigate(['/', 'question', 'update', question.getId()]);
  }

  public onDelete(question: Question) {
    this.surveyService.removeOneQuestion(this.survey.getId(), question.getId())
      .subscribe(
        (survey: Survey) => {
          this.survey = survey;
          // this.question.splice(
          //   this.question.findIndex((s: Question) => s.getId() === question.getId()),
          //   1
          // );
        }
      );
  }
  public onDeleteAnswer(questionId: number, answerId: number) {
    this.questionService.removeOneAnswer(questionId, answerId)
      .subscribe(
        (question: Question) => {
          const questionIndex = this.survey.getQuestions().findIndex(question2 => question2.getId() === questionId)
          this.survey.getQuestions()[questionIndex] = question
        }
      );

    this.answerService.removeOneId(answerId).subscribe();


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

  // Fonction appellée quand on change l'input de texte des questions

  public onKey(id: number, event: any) {
    this.inputQuestionMap.set(id, event.target.value);
    console.log('inputQuestion = ', this.inputQuestionMap);
  }
  public onKeyAnswerMap(id: number, event: any) {
    this.inputAnswerMap.set(id, event.target.value);
    console.log('inputAnswerMap = ', this.inputAnswerMap);
  }
  public onKeyAnswer(id: number, event: any) {
    // this.inputAnswerMap.set(id, event.target.value);
    this.inputUpdateAnswer = event.target.value
    console.log('inputUpdateAnswer = ', this.inputUpdateAnswer);
  }

  


  // public onSubmitQuestion() {
  //   // this.questionToAdd.setText(this.questionTextToAdd)
  //   // this.questionToAdd.setAnswerType(this.questionAnswerTypeToAdd)


  //   console.log(this.questionAnswerTypeToAdd);
  //   console.log(this.questionTextToAdd);
  //   this.questionDtoToAdd.answerType = this.questionAnswerTypeToAdd
  //   this.questionDtoToAdd.text = this.questionTextToAdd
  //   console.log('this questionDtoToAdd = ', this.questionDtoToAdd);

  // }

  public get c(): { [key: string]: AbstractControl } {
    return this.questionForm.controls;
  }

  public arrayQuestionSortedByOrder(questions: Question[]): Question[] {
    this.questionService.sortOrderInSurvey(questions)
    return questions
  }

  // Bouton OnEdit Answer

  public onEditAnswer(answer: Answer): void {
    this.router.navigate(['/', 'answer', 'update', answer.getId()]);
  }


  public addAnswerToQuestion(questionId: number) {
    // public addAnswerToQuestion() {
    if (this.inputAnswerMap.get(questionId) !== '') {

      const answerInputDto: AnswerInputDto = new AnswerInputDto(this.inputAnswerMap.get(questionId)!, 0)
      this.inputAnswerMap.set(questionId, '')
      this.answerService.addAnswerInput(answerInputDto).subscribe(

        (response: any) => {
          console.log('Lance le addManyAnswer');

          this.questionService.addManyAnswers(questionId, [response.id]).subscribe((questionResponse: Question) => {
            const questionIndex = this.survey.getQuestions().findIndex(question => question.getId() === questionId)
            let newQuestionArray: Array<Question> = this.survey.getQuestions()
            newQuestionArray[questionIndex] = questionResponse
            this.survey.setQuestions(newQuestionArray)
          })
        })
    }
  }

  // Fonction qui update l'input des réponses

  public saveAnswerText(id: number, order: number) {
    if (this.inputUpdateAnswer !== '') {
      let answerDto = new AnswerUpdateDto(id, this.inputUpdateAnswer, order)

      this.answerService.updateAnswerInput(answerDto).subscribe()
      this.inputUpdateAnswer = '';


    }

  }
// Fonction qui save le texte des questions avec le input

public saveQuestionText(id: number, type: string, orderInSurvey: number) {

  if (this.inputQuestionMap.get(id) !== '') {
    let questionDtoToAdd: QuestionInputDto =
      new QuestionInputDto(id, this.inputQuestionMap.get(id)!, type, orderInSurvey)

    console.log('this questionDTO', questionDtoToAdd);


    this.questionService.updateQuestionInput(questionDtoToAdd).subscribe()
    this.inputQuestionMap.set(id, '')

  }

}
public lastOrderInSurvey(): number {
  let orderQuestionArray: number[] = [];

  if (this.survey.getQuestions().length !== 0 ) {
    this.survey.getQuestions().forEach( question => {
      orderQuestionArray.push(question.getOrderInSurvey())
    })
  
    return Math.max(...orderQuestionArray!) + 1 
  }
  return 0
}

}
