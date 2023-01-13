import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { environment } from 'src/environments/environment';
import { Observable, take, map } from 'rxjs';
import { AnswerDto } from 'src/app/answer/dto/answer-dto';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private answers: Array<Answer> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/answer`;
  
  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Answer[]> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
    .pipe(
      take(1),
      map((answers: any[]) =>{
        return answers.map((inputAnswer: any) => {
          const answer: Answer = new Answer();
          answer.setId(inputAnswer.id);
          answer.setText(inputAnswer.text);
          return answer;

        })
      })
    );
  }

    public findOne(id: number): Observable<Answer> {
      return this.httpClient.get<any>(
        `${this.controllerBaseUrl}/${id}`
      )
      .pipe(
        take(1),
        map((inputAnswer: any) => {
          const answer: Answer = new Answer();
          answer.setId(inputAnswer.id);
          answer.setText(inputAnswer.text);
          return answer;
        })
      );
    }

    public addAnswer(answer: AnswerDto): Observable<Answer> {
      return this.httpClient.post<AnswerDto>(
        this.controllerBaseUrl,
        answer
      )
      .pipe(
        take(1),
        map((answerDto: AnswerDto) => {
          const answer: Answer = new Answer();
          answer.setId(answerDto.id!);
          answer.setText(answerDto.text);
          return answer;
        })
      );
    }

    public updateAnswer(answer: AnswerDto): Observable<Answer> {
      return this.httpClient.put<any>(
        `${this.controllerBaseUrl}/${answer.id}`,
        answer
        )
        .pipe(
          take(1),
          map((anyAnswer: any) => {
            const answer: Answer = new Answer();
            answer.setId(anyAnswer.id!);
            answer.setText(anyAnswer.text);
            return answer;
          })
        );
    }

    public removeOne(answer: Answer): Observable<HttpResponse<any>> {
      console.log(`Service: remove id: ${answer.getId()}`);
      return this.httpClient.delete<any>(
        `${this.controllerBaseUrl}/${answer.getId()}`,
        { observe: 'response' }
      );
    }


}

