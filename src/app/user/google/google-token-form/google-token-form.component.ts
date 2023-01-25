import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-google-token-form',
  templateUrl: './google-token-form.component.html',
  styleUrls: ['./google-token-form.component.scss']
})
export class GoogleTokenFormComponent implements OnInit, OnDestroy {

  public googleTokenForm!: FormGroup;
  private _subscription!: Subscription;
  public error!: string;
  @Input() public fromMailPage: boolean = false;
  @Output() public tokkenGoogleActivated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.googleTokenForm = this.formBuilder.group({
      googleToken: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  ngOnDestroy(): void {
    if (this._subscription !== undefined) {
      this._subscription.unsubscribe();
    }
  }

  public onSetGoogleToken(): void {
    console.log('Set Google token:', this.googleTokenForm.value);
    

    this._subscription = this.userService.setGoogleToken(this.googleTokenForm.value)
      .subscribe((googleAuthentificated: boolean) => {
        if (googleAuthentificated) {
          if (this.fromMailPage === true) {
            this.tokkenGoogleActivated.emit(true)

          } else {
            this.router.navigate(['/','googlepage'])
          }
        } else {
          this.error = 'invalid token'
        }
      });
  }

  public goBack(): void {
    this.location.back()
  }

}
