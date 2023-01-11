import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/service/poe.service';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';

@Component({
  selector: 'app-poe-add-stagiaire',
  templateUrl: './poe-add-stagiaire.component.html',
  styleUrls: ['./poe-add-stagiaire.component.scss']
})
export class PoeAddStagiaireComponent implements OnInit {

  public poe: Poe = new Poe();
  public stagiaires: Array<Stagiaire> = [];
  public stagairesIdToAdd: Array<number> = [];

  constructor(
    private route: ActivatedRoute,
    private poeService: PoeService,
    private stagiaireService: StagiaireService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      const poeId: number = routeParams['id'];
      this.poeService.findOne(poeId)
      .subscribe((poe: Poe) => {
        this.poe = poe;
      })
    });
    this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
      // all stagiaires
      const allStagiaires = stagiaires;
      // filtered stagiaires
      const filteredStagiaires = allStagiaires.filter((stagiaireToCheck: Stagiaire) => {
        return !this.poe.getTrainees().find(elem => elem.getId() === stagiaireToCheck.getId());
      });
      this.stagiaires = filteredStagiaires;
    })
  }

  public onListSelectionChange(obj: MatSelectionListChange): void {
    const seletedObj: Array<any> = obj.source.selectedOptions.selected
    this.stagairesIdToAdd = seletedObj.map(stagiaireInSelection => stagiaireInSelection.value);
    console.log('>> ids to add:', this.stagairesIdToAdd);
  }

  public onAddManyStagiaire(): void {
    console.log('clic');
    this.poeService.addManyStagaires(this.poe.getId(), this.stagairesIdToAdd).subscribe();
    this.router.navigate(['/', 'poe', 'detail', this.poe.getId()]);
  }
}
