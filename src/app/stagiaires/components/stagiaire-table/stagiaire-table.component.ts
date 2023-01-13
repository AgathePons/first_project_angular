import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-table',
  templateUrl: './stagiaire-table.component.html',
  styleUrls: ['./stagiaire-table.component.scss']
})
export class StagiaireTableComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = [];
  public stopDate: Date | null = null;
  public isDetailHidden: boolean = true;
  public selectedStagiaire: Stagiaire | null = null;
  public bubbleConfig: any = {
    fontWeight: 'normal',
    backgroundColor: '#580883',
  };

  public constructor(
    private stagiaireService: StagiaireService,
    private handleDetailService: HandleDetailService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
      // this.stagiaires = stagiaires.sort((a,b) => a.getLastName() > b.getLastName() ? 1 : -1);
      this.stagiaires = stagiaires;
      console.log(this.stagiaires);
      
    })
    this.handleDetailService.isDetailHidden.subscribe((isDetailHidden: boolean) => {
      this.isDetailHidden = isDetailHidden;
    });
  }

  public getVisibleStagiaireNumber(): number {
    return this.stagiaireService.getStagiairesNumber(this.stopDate);
  }

  public onEdit(stagiaire: Stagiaire): void {
    console.log('Ding dong update :', stagiaire.getFirstName(), stagiaire.getLastName());
    this.router.navigate(['/', 'stagiaire', 'update', stagiaire.getId()]);
  }

  public onDelete(stagiaire: Stagiaire): void {
    console.log(`Ici le component : Supprime ${stagiaire.getFirstName()} plizz`);
    this.stagiaireService.removeOne(stagiaire).subscribe({
      next: (_response: HttpResponse<any>) => {
        this.stagiaires.splice(
          this.stagiaires.findIndex((s: Stagiaire) => s.getId() === stagiaire.getId()),
          1
        )
        // Here goes the snackbar
      },
      error: (error: any) => {
        // Something went wrong, deal with it
      }
    });
  }

  public filterChanged(event: Date | null): void {
    console.log(`Tut tut, change filter to ${event}`);
    this.stopDate = event;
  }

  public onClick(stagiaire: Stagiaire): void {
    this.router.navigate(['/', 'stagiaire', stagiaire.getId()]);
    /* this.handleDetailService.setIsDetailHidden(false);
    this.selectedStagiaire = stagiaire; */
  }

  public onDetailClose(event: boolean): void {
    this.isDetailHidden = event;

  }

  public sortByFirstName(stagiaire: Stagiaire[]): void {
    this.stagiaireService.sortByFirstName(stagiaire)
  }
  public sortByFirstNameDesc(stagiaire: Stagiaire[]): void {
    this.stagiaireService.sortByFirstNameDesc(stagiaire)
  }
  
  public sortByLastName(stagiaire: Stagiaire[]): void {
    this.stagiaireService.sortByLastName(stagiaire)
  }
}
