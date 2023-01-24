import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PoeService } from 'src/app/core/service/poe.service';
import { SurveyEmailDto } from '../../dto/survey-email-dto';

@Component({
  selector: 'app-survey-send-email',
  templateUrl: './survey-send-email.component.html',
  styleUrls: ['./survey-send-email.component.scss']
})
export class SurveySendEmailComponent implements OnInit {

  constructor(
    private  route: ActivatedRoute,
    private poeService: PoeService
  ) { }

  public poeId: number = 0;
  public emailDto?: SurveyEmailDto
  public subject: string = "Questionnaire de suivi de formation POE"
  public body: string = 'Corps du mail'
  public beforeUrl: string = 'Bonjour, lien du formulaire Google : '
  public afterUrl: string = 'Cordialement'
  public urlGoogleForm: string = `#Veuillez effectuer l'étape 1 pour générer l'url.#`

  ngOnInit(): void {

    this.route.params
    .subscribe((routeParams: Params) => {
      //console.log((`route params: ${JSON.stringify(routeParams)}`));
      this.poeId = routeParams['id'];
      console.log('poeId = ', this.poeId);
      
    });

  }

  public sendEmail(): void {
    this.body = `${this.beforeUrl} ${this.urlGoogleForm} ${this.afterUrl}`
    this.poeService.sendEmail(this.poeId, this.subject, this.body).subscribe(resp => {
      console.log('Message envoyé');
      
    })
  }



}
