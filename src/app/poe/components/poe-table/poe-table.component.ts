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


  public stopDate: Date | null = null;
  public poes: Array<Poe> = []; 


  public constructor(
    private poeService: PoeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    });

  }



  public filterChanged(event: Date | null): void {
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
    if (this.stopDate === null) {
      return true;
    }

    if (this.stopDate.getDate() === 31) {
      // console.log('cest la stopDate ', this.stopDate);
      // console.log('cest la date de fin de poe ', poe.getEndDate());
      if (poe.getEndDate() > this.stopDate) {
        console.log(`${poe.getEndDate()} est superieure à ${this.stopDate}`);
        return true;
      }
      console.log(`${poe.getEndDate()} est inférieure à ${this.stopDate}`);
        return false;
    }
    
    return poe.getEndDate() <  this.stopDate;
  }

  public onDetailsPoe (id: number) {
    this.router.navigate(['/', 'poe', id]);

  }

}
