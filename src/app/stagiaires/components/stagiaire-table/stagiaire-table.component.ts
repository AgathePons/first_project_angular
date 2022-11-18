import { Component, OnInit } from '@angular/core';
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
    private StagiaireService: StagiaireService,
    private handleDetailService: HandleDetailService,
  ) { }

  ngOnInit(): void {
    console.log('stagiaire-table >> ngOnInit()');
    this.stagiaires = this.StagiaireService.getStagiaires();
    this.handleDetailService.isDetailHidden.subscribe((isDetailHidden: boolean) => {
      console.log(isDetailHidden ? 'hidden hihihi' : 'visible hihihi');
      this.isDetailHidden = isDetailHidden;
    });
  }

  public getVisibleStagiaireNumber(): number {
    return this.StagiaireService.getStagiairesNumber(this.stopDate);
  }
  public onRemove(stagiaire: Stagiaire): void {
    console.log(`Ici le component : Supprime ${stagiaire.getFirstName()} plizz`);
    this.StagiaireService.deleteStagiaire(stagiaire);
  }

  public filterChanged(event: Date | null): void {
    console.log(`Tut tut, change filter to ${event}`);
    this.stopDate = event;
  }

  public onClick(stagiaire: Stagiaire): void {
    this.handleDetailService.setIsDetailHidden(false);
    this.selectedStagiaire = stagiaire;
  }

  public onDetailClose(event: boolean): void {
    this.isDetailHidden = event;

  }
}
