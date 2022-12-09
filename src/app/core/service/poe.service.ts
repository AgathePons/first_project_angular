import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { PoeDto } from 'src/app/poe/dto/poe-dto';
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

  //TODO findOne

  public addPoe(poe: PoeDto): Observable<Poe> {
    console.log(`poe service addPoe`);

    return this.httpClient.post<PoeDto>(
      this.controllerBaseUrl, poe
    )
    .pipe(
      take(1),
      map((poeDto: PoeDto) => {
        const poe: Poe = new Poe();
        poe.setId(poeDto.id!);
          poe.setTitle(poeDto.title);
          poe.setBeginDate(poeDto.beginDate);
          poe.setEndDate(poeDto.endDate);
          poe.setType(poeDto.type);
          poe.setTrainees(poeDto.trainees);
        return poe;
      })
    )

  }

  public removeOne(poe: Poe): Observable<HttpResponse<any>> {
    console.log(`Service: remove id: ${poe.getId()}`);
    return this.httpClient.delete<any>(
      `${this.controllerBaseUrl}/${poe.getId()}`,
      { observe: 'response' }
      );
  }
}
