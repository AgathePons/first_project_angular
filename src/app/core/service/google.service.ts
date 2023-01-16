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

}
