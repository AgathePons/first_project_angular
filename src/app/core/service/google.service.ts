import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../models/stagiaire';

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
      "name": "POE forms",
      "mimeType": "application/vnd.google-apps.folder"
    };

    console.log('create folder...');
    console.log(`endpoint: ${this.apiGoogleDriveBaseUrl}`);
    console.log('request body:', requestBody);

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

}
