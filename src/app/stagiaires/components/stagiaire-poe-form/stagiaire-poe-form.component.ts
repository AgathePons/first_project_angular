import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Component({
  selector: 'app-stagiaire-poe-form',
  templateUrl: './stagiaire-poe-form.component.html',
  styleUrls: ['./stagiaire-poe-form.component.scss']
})
export class StagiairePoeFormComponent implements OnInit {

  public stagiairePoeForm!: FormGroup;

  @Input() public stagiaire!: Stagiaire;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(data.form);
  }

  public onSubmit() {
    console.log('click');

  }

}
