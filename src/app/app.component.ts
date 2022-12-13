import { Component } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/service/stagiaire.service';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'I <3 Angular';
  public isOverlayVisible = false;
  public hasUser: boolean = false;

  public stagiaires: Array<Stagiaire> = this.stagiairesService.getStagiaires();

  public inputType: string = 'password';

  public constructor(
    private stagiairesService: StagiaireService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.hasUser()
      .subscribe((hasUser: boolean) => {
        this.hasUser = hasUser;
      });
  }

  public onLogout(): void {
    this.userService.logout();
  }

  public toggleTitle(): void {
    if (this.title === 'I <3 Angular') {
      this.title = 'Hello World';
    } else {
      this.title = 'I <3 Angular'
    }
  }

  public makePouet(): void {
    console.log('POUET');
    if (!this.isOverlayVisible) {
      this.isOverlayVisible = true;
    }
  }

  public onShowPassword(): void {
    if (this.inputType === 'password') {
      this.inputType ='text';
      setTimeout(
        () => {
          this.inputType = 'password';
        },
        800
      );
    } else {
      this.inputType = 'password';
    }
  }
}
