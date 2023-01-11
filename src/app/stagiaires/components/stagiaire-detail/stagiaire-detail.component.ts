import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/service/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-detail',
  templateUrl: './stagiaire-detail.component.html',
  styleUrls: ['./stagiaire-detail.component.scss']
})
export class StagiaireDetailComponent implements OnInit {

  @Input() public stagiaire!: Stagiaire;
  @Output() public onCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public bubbleConfig: any = {
    fontWeight: 'bold',
    backgroundColor: '#0046FF',
  };

  constructor(
    private stagiaireService: StagiaireService,
    private handleDetailService: HandleDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      console.log((`route params: ${JSON.stringify(routeParams)}`));
      const stagiaireId: number = routeParams['id'];
      console.log('id:', stagiaireId);
      this.stagiaireService.findOne(stagiaireId)
      .subscribe((stagiaire: Stagiaire) => {
        this.stagiaire = stagiaire;
      })
    });
  }

  public onClick(): void {
    console.log('clic');
    // this.router.navigate(['/', 'home']);
    this.location.back();
    this.onCloseEvent.emit(true);
  }
}
