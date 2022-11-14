import { Component } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/service/stagiaire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'I <3 Angular';

  public stagiaires: Array<Stagiaire> = this.stagiairesService.getStagiaires();

  public constructor(
    private stagiairesService: StagiaireService
  ) {}

  public toggleTitle(): void {
    if (this.title === 'I <3 Angular') {
      this.title = 'Hello World';
    } else {
      this.title = 'I <3 Angular'
    }
  }

  public addStagiaire(): void {
    console.log('POUET');

  }
}
