import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/service/poe.service';

@Component({
  selector: 'app-poe-details',
  templateUrl: './poe-details.component.html',
  styleUrls: ['./poe-details.component.scss']
})
export class PoeDetailsComponent implements OnInit {

  public poe: Poe = new Poe();
  public stagiaires: Array<Stagiaire> = [];

  constructor(
    private route: ActivatedRoute,
    private poeService: PoeService,
    private router: Router,
    private location: Location,
    ) { }

  ngOnInit(): void {
    console.log('ngOnInit');

    this.route.params
    .subscribe((routeParams: Params) => {
      //console.log((`route params: ${JSON.stringify(routeParams)}`));
      const poeId: number = routeParams['id'];
      this.poeService.findOne(poeId)
      .subscribe((poe: Poe) => {
        this.poe = poe;
        this.stagiaires = poe.getTrainees();
        console.log('stagiaires found >>', this.stagiaires);
      });
    });
  }

  public onDelete(stagiaire: Stagiaire) {
    this.poeService.removeOneStagiaire(this.poe.getId(), stagiaire.getId())
    .subscribe(
      (poe: Poe) => {
        this.poe = poe;
        this.stagiaires.splice(
          this.stagiaires.findIndex((s: Stagiaire) => s.getId() === stagiaire.getId()),
          1
        );
      }
    );
  }

  public onClick(stagiaire: Stagiaire): void {
    this.router.navigate(['/', 'stagiaire', stagiaire.getId()]);
  }

  public onBackButton(): void {
    this.location.back();
  }
}
