import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
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
          this.router.navigate(['/', 'googlepage']);
        } else {
          this.error = 'invalid token'
        }
      });
  }

}
