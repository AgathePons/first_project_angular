import { Component, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/service/poe.service';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {

  public poes: Array<Poe> = [];
  public currentDate: Date = new Date()
  public dateOneMonthAgo: Date = new Date(new Date().setMonth(new Date().getMonth() - 1))
  public dateSixMonthsAgo: Date = new Date(new Date().setMonth(new Date().getMonth() - 6))
  public dateOneYearAgo: Date = new Date(new Date().setMonth(new Date().getMonth() - 12))

  constructor(
    private poeService: PoeService
  ) { }

  ngOnInit(): void {
    this.poeService.findAllWithSurveyStatus().subscribe((poes: Poe[]) => {
      this.poes = poes
    });


  }

}
