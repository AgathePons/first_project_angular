import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/core/service/google.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-google-main-page',
  templateUrl: './google-main-page.component.html',
  styleUrls: ['./google-main-page.component.scss']
})
export class GoogleMainPageComponent implements OnInit {

  public hasUser: boolean = false;
  public hasGoogleToken: boolean = false;
  public googleFolder: any = undefined;

  constructor(
    private userService: UserService,
    private googleService: GoogleService,
  ) { }

  ngOnInit(): void {
    this.userService.hasUser()
      .subscribe((hasUser: boolean) => {
        this.hasUser = hasUser;
      });
    this.userService.hasGoogleToken()
      .subscribe((hasGoogleToken: boolean) => {
        this.hasGoogleToken = hasGoogleToken;
      });
  }

  public onCreateFolder(): void {
    console.log('AppComponent >> onCreateFolder');
    this.googleService.findFolder().subscribe((googleFolder: any) => {
      this.googleFolder = googleFolder;
    });
  }

  public onDeleteGoogleToken(): void {
    this.userService.deleteGoogleToken();
  }

}
