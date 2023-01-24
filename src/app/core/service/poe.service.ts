import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { PoeDto } from 'src/app/poe/dto/poe-dto';
import { PoeSurveyDto } from 'src/app/poe/dto/poe-survey-dto';
import { SurveyEmailDto } from 'src/app/survey/dto/survey-email-dto';
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

  public findAllWithSurveyStatus(): Observable<Poe[]> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/withSurvey`
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
            poe.setStatus1(inputPoe.status1);
            poe.setSentDate1(new Date(inputPoe.sentDate1))
            poe.setStatus6(inputPoe.status6);
            poe.setSentDate6(new Date(inputPoe.sentDate6))
            poe.setStatus12(inputPoe.status12);
            poe.setSentDate12(new Date(inputPoe.sentDate12))
            // poe.setNextTaskDate(this.nextPoeTaskDate(poe))
            if (inputPoe.status1 === false) {
              let endDate: Date = new Date(inputPoe.endDate)
              poe.setNextTaskDate(new Date(endDate.setMonth(endDate.getMonth() + 1)))
            } else if (inputPoe.status6 === false) {
              let endDate: Date = new Date(inputPoe.endDate)
              poe.setNextTaskDate(new Date(endDate.setMonth(endDate.getMonth() + 6)))
              poe.setPastTaskDate(poe.getSentDate1())
            } else if (inputPoe.status12 === false)  {
              let endDate: Date = new Date(inputPoe.endDate)
              poe.setNextTaskDate(new Date(endDate.setMonth(endDate.getMonth() + 12)))
              poe.setPastTaskDate(poe.getSentDate6())
              
            } else {
              poe.setPastTaskDate(poe.getSentDate12())
            }
            
            return poe;
          })
        })
      );
  }

  public findOneWithStatus(id: number): Observable<Poe> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}/WithStatus`
    )
      .pipe(
        take(1),
        map((inputPoe: any) => {
          const poe: Poe = new Poe();
            poe.setId(inputPoe.id);
            poe.setTitle(inputPoe.title);
            poe.setBeginDate(new Date(inputPoe.beginDate));
            poe.setEndDate(new Date(inputPoe.endDate));
            poe.setType(inputPoe.type);
            poe.setStatus1(inputPoe.status1);
            poe.setSentDate1(new Date(inputPoe.sentDate1))
            poe.setStatus6(inputPoe.status6);
            poe.setSentDate6(new Date(inputPoe.sentDate6))
            poe.setStatus12(inputPoe.status12);
            poe.setSentDate12(new Date(inputPoe.sentDate12))
            // poe.setNextTaskDate(this.nextPoeTaskDate(poe))
            if (inputPoe.status1 === false) {
              let endDate: Date = new Date(inputPoe.endDate)
              poe.setNextTaskDate(new Date(endDate.setMonth(endDate.getMonth() + 1)))
            } else if (inputPoe.status6 === false) {
              let endDate: Date = new Date(inputPoe.endDate)
              poe.setNextTaskDate(new Date(endDate.setMonth(endDate.getMonth() + 6)))
              poe.setPastTaskDate(poe.getSentDate1())
            } else if (inputPoe.status12 === false)  {
              let endDate: Date = new Date(inputPoe.endDate)
              poe.setNextTaskDate(new Date(endDate.setMonth(endDate.getMonth() + 12)))
              poe.setPastTaskDate(poe.getSentDate6())
              
            } else {
              poe.setPastTaskDate(poe.getSentDate12())
            }
            
            return poe;
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
    console.log(`POE DTO >>`, poe);

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

  public addManyStagaires(id: number, ids: Array<number>): Observable<Poe> {
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

  public sendEmail(poeId: number, subject: string, body: string) {
    let emailDto: SurveyEmailDto = new SurveyEmailDto(subject, body)
    console.log('emailDto', emailDto);
    
    return this.httpClient.put<any>(
      `${this.controllerBaseUrl}/${poeId}/sendMail`,
      emailDto
    )
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

  public differenceInDays(date_1: Date, date_2: Date): number {
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  }


  public nextPoeTask(poe: Poe): string {
    if (poe.getStatus1() === false) {
      return 'Questionnaire 1 mois'
    } else if (poe.getStatus6() === false) {
      return 'Questionnaire 6 mois'
    } else if (poe.getStatus12() === false) {
      return 'Questionnaire 12 mois'
    } return 'Les 3 Questionnaires sont envoyés'
  }

  

  public nextPoeTaskDate(poe: Poe): Date {
    if (this.nextPoeTask(poe) === 'Questionnaire 1 mois') {
      let newDate: Date = poe.getEndDate()
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    } else if (this.nextPoeTask(poe) === 'Questionnaire 6 mois') {
      let newDate: Date = poe.getEndDate()
      newDate.setMonth(newDate.getMonth() + 6)
      return newDate
    }
    let newDate: Date = poe.getEndDate()
    newDate.setMonth(newDate.getMonth() + 12)
    return newDate
  }

  public pastPoeTask(poe: Poe): string {
    if (poe.getStatus1() === false) {
      return 'Aucune'
    } else if (poe.getStatus6() === false) {
      return 'Questionnaire 1 mois'
    } else if (poe.getStatus12() === false) {
      return 'Questionnaire 6 mois'
    } return 'Questionnaire 12 mois'
  }

  public pastPoeTaskDate(poe: Poe): Date {
    if (this.pastPoeTask(poe) === 'Questionnaire 1 mois') {
      return poe.getSentDate1()
    } else if (this.pastPoeTask(poe) === 'Questionnaire 6 mois') {
      return poe.getSentDate6()
    } else
      return poe.getSentDate12()
  }
  
  public date1Month(date: Date): Date {
    return new Date(new Date().setMonth(new Date().getMonth() + 1))
  }

  public updatePoeStatus(poeSurveyDto: PoeSurveyDto): Observable<Poe> {
    console.log('call updatePoeStatus');
    console.log('Json object', poeSurveyDto);

    return this.httpClient.patch<any>(
      this.controllerBaseUrl,
      poeSurveyDto
    )
  }



}
