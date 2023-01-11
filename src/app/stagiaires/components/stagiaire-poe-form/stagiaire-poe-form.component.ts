import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Component({
  selector: 'app-stagiaire-poe-form',
  templateUrl: './stagiaire-poe-form.component.html',
  styleUrls: ['./stagiaire-poe-form.component.scss']
})
export class StagiairePoeFormComponent implements OnInit {

  public stagiairePoeForm!: FormGroup;
  public addMode: boolean = true;

  @Input() public stagiaire!: Stagiaire;

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {
    console.log('click');

  }

}
