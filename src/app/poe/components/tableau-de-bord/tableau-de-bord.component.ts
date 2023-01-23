import { Component, OnInit } from '@angular/core';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/service/poe.service';
import { PoeSurveyDto } from '../../dto/poe-survey-dto';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {

  public poes: Array<Poe> = [];
  public poesPastTasks: Array<Poe> = [];
  public currentDate: Date = new Date()
  public currentDatePlus7: Date = new Date(new Date().setDate(new Date().getDate() + 7 ))
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
      
      this.poes = this.poes.sort((a,b) => a.getNextTaskDate() > b.getNextTaskDate() ? 1 : -1);

      this.poesPastTasks = []
      this.poes.forEach(poe => {
        if (this.pastPoeTask(poe) !== 'Aucune') {
          this.poesPastTasks.push(poe)
        }
      })

      console.log('poesPastTasks', this.poesPastTasks);
      

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

  public updateStatus(poe: Poe): void {
    console.log('poe status1', poe.getStatus1());
    console.log('poe status6', poe.getStatus6());
    console.log('poe status12', poe.getStatus12());
    if (poe.getStatus1() === false) {

      console.log('call maj staatus 1');
      
      let obj: PoeSurveyDto = new PoeSurveyDto();
      obj.id = poe.getId();
      obj.status1 = true;
      obj.sentDate1 = new Date();
      console.log('obj dto = ', obj);
      
      this.poeService.updatePoeStatus(obj).subscribe(response => {
        this.ngOnInit()

      })
    } else if (poe.getStatus6() === false) {
      let obj: PoeSurveyDto = new PoeSurveyDto();
      obj.id = poe.getId();
      obj.status6 = true;
      obj.sentDate6 = new Date();
      console.log('obj dto = ', obj);

      this.poeService.updatePoeStatus(obj).subscribe(response => {
        this.ngOnInit()

      })
    } else if (poe.getStatus12() === false) {
      let obj: PoeSurveyDto = new PoeSurveyDto();
      obj.id = poe.getId();
      obj.status12 = true;
      obj.sentDate12 = new Date();
      console.log('obj dto = ', obj);

      this.poeService.updatePoeStatus(obj).subscribe(response => {
        this.ngOnInit()

      })
    }
    
  }

  public pastPoeTaskDate(poe: Poe): Date {
    return this.poeService.pastPoeTaskDate(poe)
  }
  
  public pastPoeTask(poe: Poe): string {
    return this.poeService.pastPoeTask(poe)
  }
}
