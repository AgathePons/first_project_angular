import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'I <3 Angular';

  public stagiaires: Array<string> = [
    'JL',
    'Martine',
    'Fanny',
    'Charles',
    'Jerem',
  ]

  public toggleTitle(): void {
    if (this.title === 'I <3 Angular') {
      this.title = 'Hello World';
    } else {
      this.title = 'I <3 Angular'
    }
  }

  public addStagiaire(): void {
    this.stagiaires.push('Dummy stagiaire');
  }
}
