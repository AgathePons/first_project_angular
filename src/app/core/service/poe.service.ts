import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poe } from '../models/poe';

@Injectable({
  providedIn: 'root'
})
export class PoeService {

  private poes: Array<Poe> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/poe`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAll(): Observable<Poe[]> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
    .pipe(
      take(1),
      map((poes: any[]) => {
        return poes.map((inputPoe: any) => {
          const poe: Poe = new Poe();
          poe.setId(inputPoe.id);
          poe.setTitle(inputPoe.title);
          poe.setBeginDate(inputPoe.beginDate);
          poe.setEndDate(inputPoe.endDate);
          poe.setType(inputPoe.type);
          poe.setTrainees(inputPoe.trainees);
          return poe;
        })
      })
    );
  }
}
