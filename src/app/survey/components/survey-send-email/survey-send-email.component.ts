import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/service/poe.service';
import { PoeSurveyDto } from 'src/app/poe/dto/poe-survey-dto';
import { UserService } from 'src/app/user/services/user.service';
import { SurveyEmailDto } from '../../dto/survey-email-dto';

@Component({
  selector: 'app-survey-send-email',
  templateUrl: './survey-send-email.component.html',
  styleUrls: ['./survey-send-email.component.scss']
})
export class SurveySendEmailComponent implements OnInit {

  constructor(
    private  route: ActivatedRoute,
    private poeService: PoeService,
    private userService: UserService
  ) { }

  public poeId: number = 0;
  public emailDto?: SurveyEmailDto
  public subject: string = "Questionnaire de suivi de formation POE"
  public body: string = 'Corps du mail'
  public beforeUrl: string = 'Tu trouveras ci-dessous le lien du formulaire Google : '
  public afterUrl: string = `Cordialement, Ton professeur préféré.`
  public urlGoogleForm: string = `#`
  public mailSent: boolean = false
  public mailGenerating: boolean = false
  public hasGoogleToken: boolean = false;


  ngOnInit(): void {

    this.route.params
    .subscribe((routeParams: Params) => {
      //console.log((`route params: ${JSON.stringify(routeParams)}`));
      this.poeId = routeParams['id'];
      console.log('poeId = ', this.poeId);
      
    });

    this.userService.hasGoogleToken()
      .subscribe((hasGoogleToken: boolean) => {
        this.hasGoogleToken = hasGoogleToken;
      });

  }

  public addFormUrl(event: string): void {
    this.urlGoogleForm = event
  }

  public activateHasTokken(event: boolean): void {
    this.hasGoogleToken = event
  }
  public sendEmail(): void {
    this.mailGenerating = true;
    this.body = `${this.beforeUrl} ${this.urlGoogleForm} ${this.afterUrl}`
    this.poeService.sendEmail(this.poeId, this.subject, this.body).subscribe(resp => {
      this.mailGenerating = false;
      console.log('Message envoyé');
      this.updateStatus()
      this.mailSent = true;
    })
  }
  
  public sendHtmlEmail(): void {
    this.mailGenerating = true;
    this.body = `<br>${this.beforeUrl} <br><br> ${this.urlGoogleForm} <br><br> ${this.afterUrl}`
    this.poeService.sendHtmlEmail(this.poeId, this.subject, this.body).subscribe(resp => {
      this.mailGenerating = false;
      console.log('Message envoyé');
      this.updateStatus()
      this.mailSent = true;
    })
  }

  public updateStatus(): void {

    let poe: Poe = new Poe();

    this.poeService.findOneWithStatus(this.poeId).subscribe(poeResp => {
      poe = poeResp

      if (poe.getStatus1() === false) {

      
        let obj: PoeSurveyDto = new PoeSurveyDto();
        obj.id = this.poeId;
        obj.status1 = true;
        obj.sentDate1 = new Date();
        console.log('obj dto = ', obj);
        
        this.poeService.updatePoeStatus(obj).subscribe()
      } else if (poe.getStatus6() === false) {
        let obj: PoeSurveyDto = new PoeSurveyDto();
        obj.id = this.poeId;
        obj.status6 = true;
        obj.sentDate6 = new Date();
        console.log('obj dto = ', obj);
  
        this.poeService.updatePoeStatus(obj).subscribe()
      } else if (poe.getStatus12() === false) {
        let obj: PoeSurveyDto = new PoeSurveyDto();
        obj.id = this.poeId;
        obj.status12 = true;
        obj.sentDate12 = new Date();
        console.log('obj dto = ', obj);
  
        this.poeService.updatePoeStatus(obj).subscribe()
      }

    })
    
    
    
  }


}
