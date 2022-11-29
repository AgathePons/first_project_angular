import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
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
    private handleDetailService: HandleDetailService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((routeParams: Params) => {
      console.log((`route params: ${JSON.stringify(routeParams)}`));
      const stagiaireId: number = routeParams['id'];
      console.log('id:', stagiaireId);

    });
  }

  public onClick(): void {
    console.log('clic');
    this.onCloseEvent.emit(true);
  }
}
