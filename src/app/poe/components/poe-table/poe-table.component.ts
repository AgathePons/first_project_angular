import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { Poe } from 'src/app/core/models/poe';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class PoeTableComponent implements OnInit {

  public poes: Array<Poe> = [
    new Poe (1, "java fullstack", new Date(), new Date(), "POEC")
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
