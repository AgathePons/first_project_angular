import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Survey } from 'src/app/core/models/survey';
import { GoogleService } from 'src/app/core/service/google.service';
import { SurveyService } from 'src/app/core/service/survey.service';
import { UserService } from 'src/app/user/services/user.service';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-google-main-page',
  templateUrl: './google-main-page.component.html',
  styleUrls: ['./google-main-page.component.scss']
})
export class GoogleMainPageComponent implements OnInit {

  public hasUser: boolean = false;
  public hasGoogleToken: boolean = false;
  public googleFolderId: string = '';
  public googleFormId: string = '';
  public googleForm: any = null;

  @Output() public formUrlEvent: EventEmitter<string> = new EventEmitter<string>();

  private googleFolderResponse: any | null = null;
  //private surveys: Array<Survey> = [];

  public surveysWithLink: Array<any> = [];

  constructor(
    private userService: UserService,
    private googleService: GoogleService,
    private surveyService: SurveyService,
    private clipboard: Clipboard,
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

  public onTest(survey: Survey): void {
    console.log('Survey >>', survey);
    this.googleService.surveyToGoogleRequestBody(survey);
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
        surveys.forEach((survey, index) => {
          this.surveyService.findOne(survey.getId()).subscribe((survey: Survey) => {
            //this.surveys.push(survey);
            this.surveysWithLink.push(survey);
            this.surveysWithLink[index].link = '';
          })
        })
      });
    });
  }

  public onGenerate(survey: Survey): void {
    console.log('clic generate survey');
    const surveyId = survey.getId();
    const surveywithLink = this.surveysWithLink.filter(survey => survey.id === surveyId)[0];
    surveywithLink.spinner = true;
    console.log(' surveywithLink.spinner', surveywithLink.spinner);
    this.googleService.createFormFile(this.googleFolderId, survey).subscribe(
      (googleForm: any) => {
       
            
        this.googleFormId = googleForm.id;
        this.googleService.getGoogleFormById(this.googleFormId).subscribe(
          (googleFormResponse: any) => {
            this.googleForm = googleFormResponse;
            console.log('url:', this.googleForm.responderUri);
            this.formUrlEvent.emit(this.googleForm.responderUri)
            // Set the link into the cell
            const surveyId = survey.getId();
            const surveywithLink = this.surveysWithLink.filter(survey => survey.id === surveyId)[0];
            surveywithLink.link = this.googleForm.responderUri;
            surveywithLink.spinner = false;
          }
        );
        this.googleService.deleteFirstItem(this.googleFormId).subscribe(
          (googleAPIResponse: any) => {
            this.googleService.insertItemsInForm(this.googleFormId, survey).subscribe();
          }
        );
      }
    );
  }

  public goToForm(link: string): void {
    window.open(link, "_blank");
  }

  public copyToClipboard(link: string): void {
    this.clipboard.copy(link);
  }

  public onDeleteGoogleToken(): void {
    this.userService.deleteGoogleToken();
  }

}
