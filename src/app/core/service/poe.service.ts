import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { PoeDto } from 'src/app/poe/dto/poe-dto';
import { environment } from 'src/environments/environment';
import { Poe } from '../models/poe';
import { Stagiaire } from '../models/stagiaire';

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
          poe.setBeginDate(new Date(inputPoe.beginDate));
          poe.setEndDate(new Date(inputPoe.endDate));
          poe.setType(inputPoe.type);
          poe.setTrainees(inputPoe.trainees);
          return poe;
        })
      })
    );
  }

  public findOne(id: number): Observable<Poe> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    )
    .pipe(
      take(1),
      map((inputPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(inputPoe.id);
        poe.setTitle(inputPoe.title);
        poe.setBeginDate(inputPoe.beginDate);
        poe.setEndDate(inputPoe.endDate);
        poe.setType(inputPoe.type);
        const trainees: Array<Stagiaire> = inputPoe.trainees
        .map((inputStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire
        })
        poe.setTrainees(trainees);
        return poe
      })
    );
  }

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

  public updatePoe(poe: PoeDto): Observable<Poe> {
    return this.httpClient.put<any>(
      this.controllerBaseUrl,
      poe
    )
    .pipe(
      take(1),
      map((anyPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(anyPoe.id!);
        poe.setTitle(anyPoe.title);
        poe.setBeginDate(anyPoe.beginDate);
        poe.setEndDate(anyPoe.endDate);
        poe.setType(anyPoe.type);
        poe.setTrainees(anyPoe.trainees);
        return poe;
      })
    );
  }

  public removeOne(poe: Poe): Observable<HttpResponse<any>> {
    console.log(`Service: remove id: ${poe.getId()}`);
    return this.httpClient.delete<any>(
      `${this.controllerBaseUrl}/${poe.getId()}`,
      { observe: 'response' }
      );
  }


  public dateFilter(mois: number): Date {
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - mois);
    console.log('c est la date du filtre : ', currentDate);
    
    return currentDate;
  }

  public addManyStagaires(id: number,ids: Array<number>): Observable<Poe> {
    return this.httpClient.patch<any>(
      `${this.controllerBaseUrl}/${id}/addTrainees`,
      ids
    )
    .pipe(
      take(1),
      map((inputPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(inputPoe.id);
        poe.setTitle(inputPoe.title);
        poe.setBeginDate(inputPoe.beginDate);
        poe.setEndDate(inputPoe.endDate);
        poe.setType(inputPoe.type);
        const trainees: Array<Stagiaire> = inputPoe.trainees
        .map((inputStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire
        })
        poe.setTrainees(trainees);
        return poe
      })
    );
  }

  public removeOneStagiaire(poeId: number, stagiaireId: number) {
    return this.httpClient.patch<any>(
      `${this.controllerBaseUrl}/${poeId}/remove/${stagiaireId}`,
      null
    )
    .pipe(
      take(1),
      map((inputPoe: any) => {
        const poe: Poe = new Poe();
        poe.setId(inputPoe.id);
        poe.setTitle(inputPoe.title);
        poe.setBeginDate(inputPoe.beginDate);
        poe.setEndDate(inputPoe.endDate);
        poe.setType(inputPoe.type);
        const trainees: Array<Stagiaire> = inputPoe.trainees
        .map((inputStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire
        })
        poe.setTrainees(trainees);
        return poe
      })
    );
  }
}
