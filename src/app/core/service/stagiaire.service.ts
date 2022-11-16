import { Injectable } from '@angular/core';
import { Stagiaire } from '../models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  private stagiaires: Array<Stagiaire> = [];

  constructor() {
    this.feedIt();
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

  public deleteStagiaire(stagiaire: Stagiaire): void {
    console.log(`Kikooo ici le service, on voudrait delete ${stagiaire.getFirstName()}, merci bisouuu`);
    const stagiaireIndex: number = this.stagiaires.findIndex(
      (obj: Stagiaire) => obj.getId() === stagiaire.getId()
    );
    this.stagiaires.splice(stagiaireIndex, 1);
  }

  private feedIt(): void {
    let stagiaire: Stagiaire = new Stagiaire();
    stagiaire.setId(1);
    stagiaire.setFirstName('Agathe');
    stagiaire.setLastName('Pons');
    stagiaire.setEmail('mail-mail@mail.mail');
    stagiaire.setPhoneNumber('+(33)6 66 66 66 66');
    stagiaire.setBirthDate(new Date(2000, 1, 22));
    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(2);
    stagiaire.setFirstName('Pierre-Nicolas');
    stagiaire.setLastName('Godiaud');
    stagiaire.setEmail('legodiaud@mail.fr');
    stagiaire.setPhoneNumber('+(33)7 77 77 77 77');
    stagiaire.setBirthDate(new Date(2002, 5, 17));
    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(3);
    stagiaire.setFirstName('Ninon');
    stagiaire.setLastName('Dupont');
    stagiaire.setEmail('ninon@mail.fr');
    stagiaire.setPhoneNumber('+(33)7 33 33 33 33');
    stagiaire.setBirthDate(new Date(1998, 2, 5));
    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(4);
    stagiaire.setFirstName('Lucky');
    stagiaire.setLastName('Luck');
    stagiaire.setEmail('luckyluck@mail.fr');
    stagiaire.setPhoneNumber('+(33)6 97 56 23 98');
    stagiaire.setBirthDate(new Date(1997, 10, 15));
    this.stagiaires.push(stagiaire);

    stagiaire = new Stagiaire();
    stagiaire.setId(5);
    stagiaire.setFirstName('Youpi');
    stagiaire.setLastName('Tralala');
    stagiaire.setEmail('youpitralala@mail.fr');
    stagiaire.setPhoneNumber('+(33)6 12 23 34 45');
    stagiaire.setBirthDate(new Date(1945, 8, 15));
    this.stagiaires.push(stagiaire);
  }
}
