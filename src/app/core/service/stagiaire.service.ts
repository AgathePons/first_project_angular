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

  /* public addStagiaire(stagiaire: Stagiaire): void {
    console.log(`stagiaire service ding dong `, stagiaire);
    this.httpClient.post(`${this.controllerBaseUrl}`, stagiaire)
      .subscribe((res) => {
        console.log('Response:', res);
        // TODO add res in stagiaire instance and push it into stagiaire list
      });
  } */

  public addStagiaire(stagiaire: StagiaireDto): void {
    console.log(`stagiaire service ding dong `, stagiaire);
    this.httpClient.post<StagiaireDto>(`${this.controllerBaseUrl}`, stagiaire)
      .pipe(
        // TODO take + map to adapt response in JSON into stagiaire object
        catchError((error: HttpErrorResponse) => {
          console.log('stagiaire not created:', error);
          return throwError(() => new Error('Not created'));
        })
      )
      .subscribe(res => {
        console.log('Res:', res);

      });
  }

  public deleteStagiaire(stagiaire: Stagiaire): void {
    console.log(`Kikooo ici le service, on voudrait delete ${stagiaire.getFirstName()}, merci bisouuu`);
    // call backend
    this.httpClient.delete(
      `${this.controllerBaseUrl}/${stagiaire.getId()}`
      )
      .subscribe((res: any) => console.log('pouet deleteStagiaire()')
      );
    // update local
    const stagiaireIndex: number = this.stagiaires.findIndex(
      (obj: Stagiaire) => obj.getId() === stagiaire.getId()
    );
    this.stagiaires.splice(stagiaireIndex, 1);
  }

}
