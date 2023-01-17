import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/core/models/survey';
import { SurveyService } from 'src/app/core/service/survey.service';
import { SurveyDto } from '../../dto/survey-dto';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  public surveyForm!: FormGroup;
  public addMode: boolean = true;
  public survey!: Survey;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(data.form);
    this.surveyForm = data.form;

    console.log('surveyForm.value.id ==>', this.surveyForm.value.id);

    if (this.surveyForm.value.id !== undefined && this.surveyForm.value.id !== 0) {
      console.log('addMode false');
      this.addMode = false;
    } else {
      console.log('addMode true');
      this.addMode = true;
    }
  }

  public onSubmit(): void {
    console.log('clic');
    const dto: SurveyDto = new SurveyDto(this.surveyForm.value);
    let subscription: Observable<any>;

    if(this.addMode) {
      subscription = this.surveyService.addSurvey(dto);
    } else {
      subscription = this.surveyService.updateSurvey(dto);
    }
    subscription.subscribe((survey: Survey) => {
      this.survey = survey;
      this.goBack();
    })
  }

  public goBack(): void {
    this.location.back();
  }

  public get c(): {[key: string]: AbstractControl} {
    return this.surveyForm.controls;
  }

}
