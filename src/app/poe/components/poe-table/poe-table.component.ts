import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/service/poe.service';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class PoeTableComponent implements OnInit {


  public stopDate: String | null = null;
  public filterDate: Date = new Date();
  public poes: Array<Poe> = [];
  public poeOneMonth: Date = this.poeService.dateFilter(1);
  public poeSixMonths: Date = this.poeService.dateFilter(6);
  public poeOneYear: Date = this.poeService.dateFilter(12);
  private filterMap: Map<string, boolean> = new Map<string, boolean>()
  filterTitle = '';
  filterSD = '';
  filterED = '';
  filter = false;
  public allPoes: Array<Poe> = [];


  public constructor(
    private poeService: PoeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    });
    this.filterMap.set('filterTitle', false);
    this.filterMap.set('filterSD', false);
    this.filterMap.set('filterED', false);
    this.filterMap.set('filterType', false);

    this.filterMap.forEach((value, key) => {
      console.log(value);
      
    })


    console.log('get filtertitle = ',this.filterMap.get('filterTitle'));
    console.log('filtertitle values = ',this.filterMap.values());
    console.log('filtertitle next = ',this.filterMap.values().next());
    console.log('filtertitle value = ',this.filterMap.values().next().value);
  }

  

  public filterChanged(event: String | null): void {
    console.log(`Tut tut, change filter to ${event}`);
    this.stopDate = event;
    // console.log('La stopDate est : ', this.stopDate);

  }



  public onEdit(poe: Poe): void {
    this.router.navigate(['/', 'poe', 'update', poe.getId()]);
  }


  public onDelete(poe: Poe): void {
    console.log(`Ici le component : Supprime ${poe.getTitle()} plizz`);
    this.poeService.removeOne(poe).subscribe({
      next: (_response: HttpResponse<any>) => {
        this.poes.splice(
          this.poes.findIndex((s: Poe) => s.getId() === poe.getId()),
          1
        )

      },
      error: (error: any) => {
        // Something went wrong, deal with it
      }
    });
  }

  public changeView(poe: Poe): boolean {

    // console.log('stopdate = ', this.stopDate );
    // console.log('datefilter1 = ', this.poeService.dateFilter(1));
    // console.log('datefilter6 = ', this.poeService.dateFilter(6));
    // console.log('datefilter12 = ', this.poeService.dateFilter(12));
    // console.log('result égalite filtre1', this.stopDate === 'oneMonth');


    
    

    if (this.stopDate === null) {
      return true;

    }

    // if (this.stopDate === this.dateFilter(1)) {
    else if (this.stopDate === 'oneMonth') {
      console.log('filtre 1 mois');
      
    return poe.getEndDate() < this.poeOneMonth && poe.getEndDate() > this.poeSixMonths
      // return false;
    }
    else if (this.stopDate === 'sixMonths') {
      console.log('filtre 6 mois');
      return poe.getEndDate() < this.poeSixMonths && poe.getEndDate() > this.poeOneYear
    
    }
    else if (this.stopDate === 'oneYear') {
    console.log('filtre 12 mois');
    
      return poe.getEndDate() < this.poeOneYear;
    }
    return false;
    
  }

  searchByTitle(value: string): void {
    // this.filterBD = '';
    // if (this.filterLN !== '') {
    //   this.stagiaires = this.allStagiaires.filter((val) =>
    //     val.getFirstName().toLowerCase().includes(value.toLowerCase())
    //   ).filter((val) =>
    //     val.getLastName().toLowerCase().includes(this.filterLN.toLowerCase())
    //   )
    // } else {
    //   this.stagiaires = this.allStagiaires.filter((val) =>
    //     val.getFirstName().toLowerCase().includes(value.toLowerCase())
    //   );
    // }
  }
  searchByBirthDate(value: string): void {
    // this.filterLN = '';
    // this.filterFN = '';
    //   this.stagiaires = this.allStagiaires.filter((val) =>
    //     val.getBirthDate().getFullYear().toString().includes(value))
  
  }

  public onDetailsPoe (id: number) {
    this.router.navigate(['/', 'poe', id]);

  }

  changeBooleanState() {
    console.log('changebutton call');

    if (this.filter) { this.filter = false }
    else {
      this.filter = true
    }
  }

  resetFilter(): void {
    this.filterTitle = '';
    this.filterED= '';
    this.filterSD = '';
    this.poes = this.allPoes
  }


}
