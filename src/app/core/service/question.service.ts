import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { QuestionDto } from 'src/app/question/dto/question-dto';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Array<Question> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/question`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Question[]> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
    .pipe(
      take(1),
      map((questions: any[]) =>{
        return questions.map((inputQuestion: any) => {
          const question: Question = new Question();
          question.setId(inputQuestion.id);
          question.setText(inputQuestion.text);
          question.setAnswerType(inputQuestion.answerType);
          return question;
        })
      })
    );
  }

  public findOne(id: number): Observable<Question> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    )
    .pipe(
      take(1),
      map((inputQuestion: any) => {
        const question: Question = new Question();
        question.setId(inputQuestion.id);
        question.setText(inputQuestion.text);
        question.setAnswerType(inputQuestion.answerType);
        return question;
      })
    );
  }

  public addQuestion(question: QuestionDto): Observable<Question> {
    return this.httpClient.post<QuestionDto>(
      this.controllerBaseUrl,
      question
    )
    .pipe(
      take(1),
      map((questionDto: QuestionDto) => {
        const question: Question = new Question();
        question.setId(questionDto.id!);
        question.setText(questionDto.text);
        question.setAnswerType(questionDto.answerType);
        return question;
      })
    );
  }

  public updateQuestion(id: number, question: QuestionDto): Observable<Question> {
    return this.httpClient.put<any>(
      `${this.controllerBaseUrl}/${id}`,
      question
      )
      .pipe(
        take(1),
        map((anyQuestion: any) => {
          const question: Question = new Question();
          question.setId(anyQuestion.id!);
          question.setText(anyQuestion.text);
          question.setAnswerType(anyQuestion.answerType);
          return question;
        })
      );
  }

  public removeOne(question: Question): Observable<HttpResponse<any>> {
    console.log(`Service: remove id: ${question.getId()}`);
    return this.httpClient.delete<any>(
      `${this.controllerBaseUrl}/${question.getId()}`,
      { observe: 'response' }
    );
  }
}