import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private apiGoogleDriveBaseUrl: string = `${environment.apiGoogleDriveBaseUrl}`;
  private apiGoogleFormBaseUrl: string = `${environment.apiGoogleFormBaseUrl}`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public findOne(formId: number): Observable<any> {
    console.log('find one form called');

    return this.httpClient.get<any>(
      `${this.apiGoogleFormBaseUrl}/${formId}`
    )
    .pipe(
      take(1),
      map((formObject: any) => {
        return formObject;
      })
    );
  }

  public createDriveFolder(): Observable<any> {
    console.log('create folder');
    const requestBody = {
      "name": "POE forms",
      "mimeType": "application/vnd.google-apps.folder"
    };
    return this.httpClient.post<any>(
      this.apiGoogleDriveBaseUrl, requestBody
    ).pipe(
      take(1),
      map((form: any) => {
        const formObject = form;
        return formObject;
      })
    );
  }

}
