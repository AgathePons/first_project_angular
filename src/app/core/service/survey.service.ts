import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { SurveyDto } from 'src/app/survey/dto/survey-dto';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer';
import { Question } from '../models/question';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Array<Survey> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/survey`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public findAll(): Observable<Survey[]> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
    .pipe(
      take(1),
      map((surveys: any[]) => {
        return surveys.map((inputSurvey: any) => {
          const survey: Survey = new Survey();
          survey.setId(inputSurvey.id);
          survey.setTitle(inputSurvey.title);
          survey.setLevel(inputSurvey.level);
          survey.setPoeType(inputSurvey.poeType);
          survey.setQuestions(inputSurvey.questions);
          return survey;
        })
      })
    );
  }

  public findOne(id: number): Observable<Survey> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    )
    .pipe(
      take(1),
      map((inputSurvey: any) => {
        const survey: Survey = new Survey();
        survey.setId(inputSurvey.id);
        survey.setTitle(inputSurvey.title);
        survey.setLevel(inputSurvey.level);
        survey.setPoeType(inputSurvey.poeType);
        // questions
        const questions: Array<Question> = inputSurvey.questions
        .map((inputQuestion: any) => {
          const question: Question = new Question();
          question.setId(inputQuestion.id);
          question.setText(inputQuestion.text);
          question.setAnswerType(inputQuestion.answerType);
          question.setOrderInSurvey(inputQuestion.orderInSurvey)
          const answers: Array<Answer> = inputQuestion.answers
            .map((inputAnswer: any) => {
              const answer: Answer = new Answer();
              answer.setId(inputAnswer.id);
              answer.setText(inputAnswer.text);
              return answer;
            })
          question.setAnswers(answers);

          return question;
        })
        survey.setQuestions(questions);
        return survey;
      })
    );
  }

  public addSurvey(survey: SurveyDto): Observable<Survey> {
    return this.httpClient.post<SurveyDto>(
      this.controllerBaseUrl, survey
    )
    .pipe(
      take(1),
      map((surveyDto: SurveyDto) => {
        const survey: Survey = new Survey();
        survey.setId(surveyDto.id!);
        survey.setTitle(surveyDto.title);
        survey.setLevel(surveyDto.level);
        survey.setPoeType(surveyDto.poeType);
        survey.setQuestions(surveyDto.questions);
        return survey;
      })
    );
  }

  public addManyQuestions(id: number,ids: Array<number>): Observable<Survey> {
    return this.httpClient.patch<any>(
      `${this.controllerBaseUrl}/${id}/addQuestions`,
      ids
    )
    .pipe(
      take(1),
      map((inputSurvey: any) => {
        const survey: Survey = new Survey();
        survey.setId(inputSurvey.id);
        survey.setTitle(inputSurvey.title);
        survey.setLevel(inputSurvey.level);
        survey.setPoeType(inputSurvey.poeType);
        const questions: Array<Question> = inputSurvey.questions
        .map((inputQuestion: any) => {
          const question: Question = new Question();
          question.setId(inputQuestion.id);
          question.setText(inputQuestion.text);
          question.setAnswerType(inputQuestion.answerType);
          question.setOrderInSurvey(inputQuestion.orderInSurvey)
          return question
        })
        survey.setQuestions(questions);
        return survey
      })
    );
  }

  public updateSurvey(survey: SurveyDto): Observable<Survey> {
    return this.httpClient.put<any>(
      `${this.controllerBaseUrl}/${survey.id}`, survey
    )
    .pipe(
      take(1),
      map((anySurvey: any) => {
        const survey: Survey = new Survey();
        survey.setId(anySurvey.id!);
        survey.setTitle(anySurvey.title);
        survey.setLevel(anySurvey.level);
        survey.setPoeType(anySurvey.poeType);
        survey.setQuestions(anySurvey.questions);
        return survey;
      })
    );
  }

  public removeOne(survey: Survey): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(
      `${this.controllerBaseUrl}/${survey.getId()}`,
      { observe: 'response' }
    );
  }

  public removeOneQuestion(surveyId: number, questionId: number) {
    return this.httpClient.patch<any>(
      `${this.controllerBaseUrl}/${surveyId}/remove/${questionId}`,
      null
    )
    .pipe(
      take(1),
      map((inputSurvey: any) => {
        const survey: Survey = new Survey();
        survey.setId(inputSurvey.id);
        survey.setTitle(inputSurvey.title);
        survey.setLevel(inputSurvey.level);
        survey.setPoeType(inputSurvey.poeType);
        const questions: Array<Question> = inputSurvey.questions
        .map((inputQuestion: any) => {
          const question: Question = new Question();
          question.setId(inputQuestion.id);
          question.setText(inputQuestion.text);
          question.setAnswerType(inputQuestion.answerType);
          question.setOrderInSurvey(inputQuestion.orderInSurvey)
          return question
        })
        survey.setQuestions(questions);
        return survey
      })
    );
  }



}
