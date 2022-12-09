import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/service/poe.service';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class PoeTableComponent implements OnInit {

   public poes: Array<Poe> = []; 

  public constructor(
    private poeService: PoeService,
  ) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    });

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

}
