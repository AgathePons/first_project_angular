import { Injectable } from '@angular/core';
import { Stagiaire } from '../models/stagiaire';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StagiaireDto } from 'src/app/stagiaires/dto/stagiaire-dto';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  private stagiaires: Array<Stagiaire> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/trainee`;

  constructor(
    private httpClient: HttpClient
  ) {
    // this.feedIt();
  }

  public findAll(): Observable<Stagiaire[]> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
    .pipe(
      take(1),
      map((stagiaires: any[]) => {
        return stagiaires.map((inputStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire;
        })
      })
    );
  }

  public findOne(id: number): Observable<Stagiaire> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    )
    .pipe(
      take(1),
      map((inputStagiaire: any) => {
        const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(inputStagiaire.id);
          stagiaire.setLastName(inputStagiaire.lastName);
          stagiaire.setFirstName(inputStagiaire.firstName);
          stagiaire.setEmail(inputStagiaire.email);
          stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
          stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
          return stagiaire;
      })
    );
  }

  public addStagiaire(stagiaire: StagiaireDto): Observable<Stagiaire> {
    console.log(`stagiaire service ding dong `, stagiaire);
    /* this.httpClient.post<StagiaireDto>(`${this.controllerBaseUrl}`, stagiaire)
      .pipe(
        // TODO take + map to adapt response in JSON into stagiaire object
        catchError((error: HttpErrorResponse) => {
          console.log('stagiaire not created:', error);
          return throwError(() => new Error('Not created'));
        })
      )
      .subscribe(res => {
        console.log('Res:', res);
        return res;
      }); */
    // Transform any to Stagiaire
    return this.httpClient.post<StagiaireDto>(
      this.controllerBaseUrl,
      stagiaire
    )
    .pipe(
      take(1),
      map((stagiaireDto: StagiaireDto) => {
        const stagiaire: Stagiaire = new Stagiaire();
        stagiaire.setId(stagiaireDto.id!);
        stagiaire.setLastName(stagiaireDto.lastName);
        stagiaire.setFirstName(stagiaireDto.firstName);
        stagiaire.setBirthDate(new Date(stagiaireDto.birthDate));
        stagiaire.setPhoneNumber(stagiaireDto.phoneNumber);
        stagiaire.setEmail(stagiaireDto.email);
        return stagiaire;
      })
      );
  }

  public updateStagiaire(stagiaire: StagiaireDto): Observable<Stagiaire> {
    return this.httpClient.put<any>(
      this.controllerBaseUrl,
      stagiaire
      )
      .pipe(
        take(1),
        map((anyStagiaire: any) => {
          const stagiaire: Stagiaire = new Stagiaire();
          stagiaire.setId(anyStagiaire.id!);
          stagiaire.setLastName(anyStagiaire.lastName);
          stagiaire.setFirstName(anyStagiaire.firstName);
          stagiaire.setBirthDate(new Date(anyStagiaire.birthDate));
          stagiaire.setPhoneNumber(anyStagiaire.phoneNumber);
          stagiaire.setEmail(anyStagiaire.email);
          return stagiaire;
        })
      );
  }

  public removeOne(stagiaire: Stagiaire): Observable<HttpResponse<any>> {
    console.log(`Service: remove id: ${stagiaire.getId()}`);
    return this.httpClient.delete<any>(
      `${this.controllerBaseUrl}/${stagiaire.getId()}`,
      { observe: 'response' }
      );
  }

  public getStagiaires(): Array<Stagiaire> {
    return this.stagiaires;
  }

  public getFilteredStagiaires(date: Date): Array<Stagiaire> {
    return this.stagiaires.filter(stagiaire => stagiaire.getBirthDate() > date);
  }

  public filterByDate(date: Date): Array<Stagiaire> {
    console.log(`filter by date`);
    const filteredStagiaires: Array<Stagiaire> = this.stagiaires.filter(stagiaire => stagiaire.getBirthDate() > date);
    return filteredStagiaires;
  }

  public getStagiairesNumber(date: Date | null): number {
    if (date === null) {
      return this.stagiaires.length;
    } else if (date.getDate() === 31) {
      return this.stagiaires.filter(stagiaire => stagiaire.getBirthDate() > date).length;
    } else {
      return this.stagiaires.filter(stagiaire => stagiaire.getBirthDate() < date).length;
    }
  }

  public sortByFirstName(stagiaires: Stagiaire[]) {

    stagiaires = stagiaires.sort((a,b) => a.getFirstName().toLowerCase() > b.getFirstName().toLowerCase() ? 1 : -1);
  }
  public sortByFirstNameDesc(stagiaires: Stagiaire[]) {

    stagiaires = stagiaires.sort((a,b) => a.getFirstName().toLowerCase() < b.getFirstName().toLowerCase() ? 1 : -1);
  }
  public sortById(stagiaires: Stagiaire[]) {

    stagiaires = stagiaires.sort((a,b) => a.getId() > b.getId() ? 1 : -1);
  }
  public sortByIdDesc(stagiaires: Stagiaire[]) {

    stagiaires = stagiaires.sort((a,b) => a.getId() < b.getId() ? 1 : -1);
  }

  public sortByLastName(stagiaires: Stagiaire[]) {

    stagiaires = stagiaires.sort((a,b) => a.getLastName().toLowerCase() > b.getLastName().toLowerCase() ? 1 : -1);
  }
  public sortByLastNameDesc(stagiaires: Stagiaire[]) {

    stagiaires = stagiaires.sort((a,b) => a.getLastName().toLowerCase() < b.getLastName().toLowerCase() ? 1 : -1);
  }

}
