import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  public allStagiaires: Array<Stagiaire> = [];
  public stagairesIdToAdd: Array<number> = [];

  filter = false;
  filterFN = '';
  filterLN = '';

  constructor(
    private route: ActivatedRoute,
    private poeService: PoeService,
    private stagiaireService: StagiaireService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      const poeId: number = routeParams['id'];
      this.poeService.findOne(poeId)
      .subscribe((poe: Poe) => {
        this.poe = poe;
        this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
          // all stagiaires
          const allStagiaires = stagiaires;
          // filtered stagiaires
          const filteredStagiaires = allStagiaires.filter((stagiaireToCheck: Stagiaire) => {
            return !this.poe.getTrainees().find(elem => elem.getId() === stagiaireToCheck.getId());
          });
          this.stagiaires = filteredStagiaires;
          this.allStagiaires = this.stagiaires
        });
      });
    });

  }

  public onListSelectionChange(obj: MatSelectionListChange): void {
    const seletedObj: Array<any> = obj.source.selectedOptions.selected
    this.stagairesIdToAdd = seletedObj.map(stagiaireInSelection => stagiaireInSelection.value);
    console.log('>> ids to add:', this.stagairesIdToAdd);
  }

  public onAddManyStagiaires(): void {
    console.log('onAddManyStagiaires');
    this.poeService.addManyStagaires(this.poe.getId(), this.stagairesIdToAdd).subscribe((poe: Poe) => {
      this.poe = poe;
      this.router.navigate(['/', 'poe', 'detail', this.poe.getId()]);
    });
  }

  public onBackButton(): void {
    this.location.back();
  }

  changeBooleanState() {
    console.log('changebutton call');

    if (this.filter) { this.filter = false }
    else {
      this.filter = true
    }
  }


  resetFilter(): void {
    this.filterFN = '';
    this.filterLN = '';
    this.stagiaires = this.allStagiaires
  }

  doSearchBar(valueFirstName: string, valueLastName: string): void {

    let temporaryStagiaires: Array<Stagiaire>

    temporaryStagiaires = this.allStagiaires.filter((val) =>
        val.getFirstName().toLowerCase().includes(valueFirstName.toLowerCase())
      )
      this.stagiaires = temporaryStagiaires.filter((val) =>
        val.getLastName().toLowerCase().includes(valueLastName.toLowerCase())
      );
  }
}
