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

    console.log(this.dateOneMonthAgo);
    console.log(this.dateSixMonthsAgo);
    console.log(this.dateOneYearAgo);

    this.poeService.findAllWithSurveyStatus().subscribe((poes: Poe[]) => {
      this.poes = poes
      
      console.log('poes1', this.poes);
      
      // this.poes.sort((a,b) =>
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //    b.getNextTaskDate().valueOf() - a.getNextTaskDate().valueOf())



      this.poes.forEach(poe => {
        console.log(poe.getId(),'endDate = ', poe.getEndDate());
      }) 
      this.poes.forEach(poe => {
        console.log(poe.getId(),'next task date = ', this.poeService.nextPoeTaskDate(poe));
      }) 
    });

    
  }

  public differenceInDays(date1: Date, date2: Date): number {
    return this.poeService.differenceInDays(date1, date2)
  }

  public datePlusXMonths(date: Date, x: number): Date {

    console.log('date = ', date);

    let newDate: Date = date;

    newDate.setMonth(newDate.getMonth() + x)

    return newDate
  }

  public nextPoeTask(poe: Poe): string {
    return this.poeService.nextPoeTask(poe)
  }

  public nextPoeTaskDate(poe: Poe): Date {
    return this.poeService.nextPoeTaskDate(poe)
  }

  public sortByTaskDate(poes: Poe[]) {
    poes.forEach(poe => {
      console.log(poe.getId(),'endDate2 = ', poe.getEndDate());
      
      // console.log(poe.getId(), poe.getStatus1(), 'next = ', this.nextPoeTask(poe) ,  'next date :', this.nextPoeTaskDate(poe));
      
    })  
    // return poes.sort((a,b) => this.nextPoeTaskDate(a).getTime() > this.nextPoeTaskDate(b).getTime() ? 1 : -1);
  }
}
