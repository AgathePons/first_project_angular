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
    stagiaire.setFirstName('Léo');
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
  }
}
