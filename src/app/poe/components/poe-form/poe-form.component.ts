import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PoeService } from 'src/app/core/service/poe.service';
import { FormBuilderService } from 'src/app/shared/form-builder.service';
import { PoeDto } from '../../dto/poe-dto';

@Component({
  selector: 'app-poe-form',
  templateUrl: './poe-form.component.html',
  styleUrls: ['./poe-form.component.scss']
})
export class PoeFormComponent implements OnInit {

  public poeForm!: FormGroup;
  public addMode: boolean = true;

  constructor(
    private poeService: PoeService,
    private formBuilderService: FormBuilderService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    console.log(data);

    this.poeForm = data.form;

    if (this.poeForm.value.id !== undefined && this.poeForm.value.id !== 0) {
      console.log('form component on init update',this.poeForm.value.id );

      this.addMode =  false;
    } else {
      console.log('form component on init add');
      this.addMode = true;
    }
  }

  public onSubmit(): void {
    console.log('clic submit poe form', this.poeForm.value);
    const dto: PoeDto = new PoeDto(this.poeForm.value);

    let subscription: Observable<any>;

    if (this.addMode) {
      subscription = this.poeService.addPoe(dto);
    } else {
      subscription = this.poeService.updatePoe(dto);
    }
    subscription.subscribe(() => this.goBack());
  }

  public goBack(): void {
    this.location.back();
  }

}
