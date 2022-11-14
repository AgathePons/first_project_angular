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
  public constructor(
    private StagiaireService: StagiaireService
  ) { }

  ngOnInit(): void {
    console.log('stagiaire-table >> ngOnInit()');

    this.stagiaires = this.StagiaireService.getStagiaires();
  }

}
