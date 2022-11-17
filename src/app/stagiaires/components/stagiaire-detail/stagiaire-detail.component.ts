import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Component({
  selector: 'app-stagiaire-detail',
  templateUrl: './stagiaire-detail.component.html',
  styleUrls: ['./stagiaire-detail.component.scss']
})
export class StagiaireDetailComponent implements OnInit {

  @Input() public stagiaire!: Stagiaire;
  @Output() public onCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(): void {
    console.log('clic');
    this.onCloseEvent.emit(true);
  }
}
