import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { CreateItemDto } from 'src/app/google/dto/create-item-dto';
import { QuestionChooseOneDto } from 'src/app/google/dto/question-choose-one-dto';
import { QuestionDto } from 'src/app/google/dto/question-dto';
import { QuestionFreeDto } from 'src/app/google/dto/question-free-dto';
import { QuestionYesNoDto } from 'src/app/google/dto/question-yes-no-dto';
import { RequestBodyDto } from 'src/app/google/dto/request-body-dto';
import { environment } from 'src/environments/environment';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private apiGoogleDriveBaseUrl: string = `${environment.apiGoogleDriveBaseUrl}`;
  private apiGoogleFormBaseUrl: string = `${environment.apiGoogleFormBaseUrl}`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public findFolder(): Observable<any> {
    console.log('find one folder called');

    return this.httpClient.get<any>(
      `${this.apiGoogleDriveBaseUrl}?pageSize=10&q=name='POE formulaires de suivi'`
    )
    .pipe(
      take(1),
      map((formObject: any) => {
        return formObject;
      })
    );
  }

  public createDriveFolder(): Observable<any> {

    const requestBody = {
      "name": "POE formulaires de suivi",
      "mimeType": "application/vnd.google-apps.folder"
    };

    return this.httpClient.post<Object>(
      this.apiGoogleDriveBaseUrl, requestBody
    ).pipe(
      take(1),
      map((folder: any) => {
        const folderObject = folder;
        return folderObject;
      })
    );
  }

  public createFormFile(folderId: string, survey: Survey): Observable<any> {

    const requestBody = {
      "name": survey.getTitle(),
      "mimeType": "application/vnd.google-apps.form",
      "parents": [folderId]
    };

    return this.httpClient.post<Object>(
      this.apiGoogleDriveBaseUrl, requestBody
    ).pipe(
      take(1),
      map((form: any) => {
        const formObject = form;
        return formObject;
      })
    );
  }

  public deleteFirstItem(formId: string):  Observable<any> {

    const requestBody = {
      "requests": [{
          "deleteItem": {
              "location": { "index": 0 }
          }
      }]
    };

    return this.httpClient.post<Object>(
      `${this.apiGoogleFormBaseUrl}/${formId}:batchUpdate`,
      requestBody
    ).pipe(
      take(1),
      map((form: any) => {
        const formObject = form;
        return formObject;
      })
    );
  }

  public surveyToGoogleRequestBody(survey: Survey): any {
    const requestBody = new RequestBodyDto();

    survey.getQuestions().forEach((question) => {
      const createItemDto = new CreateItemDto();
      if (question.getOrderInSurvey()) {
        createItemDto.createItem.location.index = question.getOrderInSurvey();
      }

      createItemDto.createItem.item.title = question.getText();

      let questionDto: QuestionDto;
      if (question.getAnswerType() === 'FREE') {
        console.log('FREE question');
        questionDto = new QuestionFreeDto();
      }
      else if (question.getAnswerType() === 'YES_NO') {
        console.log('YES_NO question');
        questionDto = new QuestionYesNoDto();
      }
      else if (question.getAnswerType() === 'CHOOSE_ONE') {
        console.log('CHOOSE_ONE question');
        let answersToInsert: Array<any> = [
          { value: 'Insert at least one possible answer'}
        ];
        if (question.getAnswers().length) {
          answersToInsert.shift();
          question.getAnswers().forEach((answer) => {
            answersToInsert.push(
              { value: answer.getText() }
            )
          });
        }

        questionDto = new QuestionChooseOneDto(answersToInsert);
      }
      else if (question.getAnswerType() === 'CHOOSE_MANY') {
        console.log('CHOOSE_MANY question');
        let answersToInsert: Array<any> = [
          { value: 'Insert at least one possible answer'}
        ];
        if (question.getAnswers().length) {
          answersToInsert.shift();
          question.getAnswers().forEach((answer) => {
            answersToInsert.push(
              { value: answer.getText() }
            )
          });
        }

        questionDto = new QuestionChooseOneDto(answersToInsert);
      }
      else {
        questionDto = new QuestionFreeDto();
      }


      createItemDto.createItem.item.questionItem = questionDto;
      console.log('push', createItemDto);

      requestBody.requests.push(createItemDto);
    })
    console.log('requestBody >>', requestBody);
    return requestBody;
  }

  public insertItemsInForm(formId: string, survey: Survey): Observable<any> {

    const requestBodyFake = {
      "requests": [
        {
          "createItem": {
              "item": {
                "title": "Racontez-nous un truc sympa",
                "questionItem": {
                  "question": {
                    "required": true,
                    "textQuestion": { "paragraph": true }
                  }
                }
              },
              "location": { "index": 0 }
          }
        },
        {
          "createItem": {
              "item": {
                "title": "Oui ou non ?",
                "questionItem": {
                  "question": {
                    "required": true,
                    "choiceQuestion": {
                      "type": "DROP_DOWN",
                      "options": [
                        {"value": "OUI"},
                        {"value": "NON"}
                      ],
                      "shuffle": false
                    }
                  }
                }
              },
              "location": { "index": 1 }
          }
        },
        {
          "createItem": {
              "item": {
                "title": "Qu'est-ce qui est jaune et qui attend ?",
                "questionItem": {
                  "question": {
                    "required": true,
                    "choiceQuestion": {
                      "type": "RADIO",
                      "options": [
                        {"value": "Orangathan"},
                        {"value": "Johnatan"},
                        {"value": "Jaune Attend"},
                        {"value": "Rosathan"}
                      ],
                      "shuffle": false
                    }
                  }
                }
              },
              "location": { "index": 2 }
          }
        },
        {
          "createItem": {
              "item": {
                "title": "Quels fruits aimez-vous ?",
                "questionItem": {
                  "question": {
                    "required": true,
                    "choiceQuestion": {
                      "type": "CHECKBOX",
                      "options": [
                        {"value": "Orange"},
                        {"value": "Citron"},
                        {"value": "Kiwi"},
                        {"value": "Fruit de la passion"}
                      ],
                      "shuffle": false
                    }
                  }
                }
              },
              "location": { "index": 3 }
          }
        }
      ]
    };

    const requestBody = this.surveyToGoogleRequestBody(survey);
    console.log('insertItemsInForm >>', requestBody);


    return this.httpClient.post<Object>(
      `${this.apiGoogleFormBaseUrl}/${formId}:batchUpdate`,
      requestBody
    ).pipe(
      take(1),
      map((form: any) => {
        const formObject = form;
        return formObject;
      })
    );
  }

}
