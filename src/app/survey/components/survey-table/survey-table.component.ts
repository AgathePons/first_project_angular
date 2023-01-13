import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from 'src/app/core/models/survey';
import { SurveyService } from 'src/app/core/service/survey.service';

@Component({
  selector: 'app-survey-table',
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.scss']
})
export class SurveyTableComponent implements OnInit {

  public surveys: Array<Survey> = [];

  constructor(
    private surveyService: SurveyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.surveyService.findAll().subscribe((surveys: Survey[]) => {
      this.surveys = surveys;
    })
  }

  public onEdit(survey: Survey): void {
    this.router.navigate(['/', 'survey', 'update', survey.getId()]);
  }

  public onDelete(survey: Survey): void {
    this.surveyService.removeOne(survey).subscribe({
      next: (_response: HttpResponse<any>) => {
        this.surveys.splice(
          this.surveys.findIndex((s: Survey) => s.getId() === survey.getId()),
          1
        )

      },
      error: (error: any) => {
        // Something went wrong, deal with it
      }

    })
  }

}
