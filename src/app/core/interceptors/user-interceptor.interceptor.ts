import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/user/services/user.service';

@Injectable()
export class UserInterceptorService implements HttpInterceptor {

  private readonly _noSecuredURIs: string[] = [
    `${environment.apiBaseUrl}/user/signin`,
    `${environment.apiBaseUrl}/user/signup`,
  ];

  private readonly _googleSecuredURIs : string[] = [
    environment.apiGoogleDriveBaseUrl,
    environment.apiGoogleFormBaseUrl,
  ];

  constructor(
    private _userService: UserService,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request: HttpRequest<any>;

    // if API survey request
    if (!this._isNotSecured(req.url) && !this._isGoogleURI(req.url)) {

      if (this._userService.hasUser$.getValue()) {
        request = req.clone({
          headers: new HttpHeaders(
            'Authorization: Bearer ' + this._userService.user?.token
          )
        })
        return next.handle(request);
      } else {
        return throwError(() => new Error('No signed user'));
      }

    }
    // if Google API request
    if (this._isGoogleURI(req.url)) {

      const tokenObject: any = this._userService.getGoogleTokenUserService()?._token;
      const token: any = tokenObject.googleToken;

      if (this._userService.hasGoogleToken$.getValue()) {
        request = req.clone({
          headers: new HttpHeaders(
            'Authorization: Bearer ' + token
          )
        });
        return next.handle(request);
      } else {
        return throwError(() => new Error('No Google token'));
      }

    }
    else {
      console.log('no secured endpoint neither google endpoint detected');
      request = req.clone();
      return next.handle(request);
    }
  }

  private _isNotSecured(url: string): boolean {
    return this._noSecuredURIs.filter((uri: string) => uri === url).length > 0;
  }

  private _isGoogleURI(url: string): boolean {
    return this._googleSecuredURIs.filter((uri: string) => uri.slice(0, 26) === url.slice(0, 26)).length > 0;
  }
}

export const userInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: UserInterceptorService,
  multi: true
}
