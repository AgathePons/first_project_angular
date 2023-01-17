import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
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

  public insertItemsInForm(formId: string, survey: Survey): Observable<any> {

    const requestBody = {
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
