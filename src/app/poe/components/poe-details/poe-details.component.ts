import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/service/poe.service';

@Component({
  selector: 'app-poe-details',
  templateUrl: './poe-details.component.html',
  styleUrls: ['./poe-details.component.scss']
})
export class PoeDetailsComponent implements OnInit {

  constructor(  
    private route: ActivatedRoute,
    private poeService: PoeService
    ) { }

  public poe: Poe = new Poe();
  public stagiaires: Array<Stagiaire> = [];

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      console.log((`route params: ${JSON.stringify(routeParams)}`));
      const poeId: number = routeParams['id'];
      this.poeService.findOne(poeId)
      .subscribe( (poe: Poe) => {
        this.poe = poe;
        this.stagiaires = poe.getTrainees();
        console.log(this.stagiaires);
        
      })
  })

}

public onDelete(stagiaire: Stagiaire) {
  console.log('lol');
  
}
}
