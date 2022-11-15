import { Component, OnInit } from '@angular/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';

@Component({
  selector: 'app-stagiaire-table',
  templateUrl: './stagiaire-table.component.html',
  styleUrls: ['./stagiaire-table.component.scss']
})
export class StagiaireTableComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = [];
  // public filteredStagiaires: Array<Stagiaire> = [];
  public stopDate: Date | null = new Date(1950, 11, 31);

  public constructor(
    private StagiaireService: StagiaireService
  ) { }

  ngOnInit(): void {
    console.log('stagiaire-table >> ngOnInit()');

    this.stagiaires = this.StagiaireService.getStagiaires();
    // this.filteredStagiaires = this.StagiaireService.getFilteredStagiaires(this.stopDate);
  }

  public getVisibleStagiaireNumber(): number {
    return this.StagiaireService.getStagiairesNumber(this.stopDate);
  }
  public onRemove(stagiaire: Stagiaire): void {
    console.log(`Ici le component : Supprime ${stagiaire.getFirstName()} plizz`);
    this.StagiaireService.deleteStagiaire(stagiaire);
  }

}
