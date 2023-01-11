import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/service/poe.service';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';
import { StagiaireTableComponent } from 'src/app/stagiaires/components/stagiaire-table/stagiaire-table.component';

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
    ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      console.log((`route params: ${JSON.stringify(routeParams)}`));
      const poeId: number = routeParams['id'];
      this.poeService.findOne(poeId)
      .subscribe((poe: Poe) => {
        this.poe = poe;
        this.stagiaires = poe.getTrainees();
        console.log(this.stagiaires);
      });
  });
}

public onDelete(stagiaire: Stagiaire) {
  console.log('lol');
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
}
