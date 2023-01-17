import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/core/models/survey';
import { GoogleService } from 'src/app/core/service/google.service';
import { SurveyService } from 'src/app/core/service/survey.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-google-main-page',
  templateUrl: './google-main-page.component.html',
  styleUrls: ['./google-main-page.component.scss']
})
export class GoogleMainPageComponent implements OnInit {

  public hasUser: boolean = false;
  public hasGoogleToken: boolean = false;
  public googleFolderResponse: any | null = null;
  public googleFolderId: string = '';
  public googleFormId: string = '';
  public surveys: Array<Survey> = [];

  constructor(
    private userService: UserService,
    private googleService: GoogleService,
    private surveyService: SurveyService,
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

  public onCheckFolder(): void {
    console.log('AppComponent >> onCreateFolder');
    this.googleService.findFolder().subscribe((googleFolder: any) => {
      this.googleFolderResponse = googleFolder;
      console.log('googleFolderResponse', this.googleFolderResponse);
      if (this.googleFolderResponse.files.length) {
        console.log('folder found');
        this.googleFolderId = this.googleFolderResponse.files[0].id;
      } else {
        console.log('folder not found');
        this.googleService.createDriveFolder().subscribe((googleFolder: any) => {
          console.log('createDriveFolder response', googleFolder);
          this.googleFolderId = googleFolder.id;
        })
      }
      // find surveys list
      this.surveyService.findAll().subscribe((surveys: Survey[]) => {
        this.surveys = surveys;
      });
    });
  }

  public onGenerate(survey: Survey): void {
    console.log('clic generate survey');
    this.googleService.createFormFile(this.googleFolderId, survey).subscribe(
      (googleForm: any) => {
        this.googleFormId = googleForm.id;
        this.googleService.deleteFirstItem(this.googleFormId).subscribe(
          (googleAPIResponse: any) => {
            this.googleService.insertItemsInForm(this.googleFormId, survey).subscribe();
          }
        );
      }
    );
  }

  public onDeleteGoogleToken(): void {
    this.userService.deleteGoogleToken();
  }

}
