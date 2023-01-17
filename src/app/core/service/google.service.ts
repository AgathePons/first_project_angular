import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../models/stagiaire';
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

}
