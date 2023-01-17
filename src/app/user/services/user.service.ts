import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, observable, Observable, of, take } from 'rxjs';
import { IStorageStrategy } from 'src/app/core/strategies/storage/i-storage-strategy';
import { LocalStrategy } from 'src/app/core/strategies/storage/local-strategy';
import { SessionStrategy } from 'src/app/core/strategies/storage/session-strategy';
import { environment } from 'src/environments/environment';
import { SignupDto } from '../dto/signup-dto';
import { UserDto } from '../dto/user-dto';
import { GoogleToken } from '../models/google-token';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;
  private _googleToken: GoogleToken | null = null;
  private _storageStrategy!: IStorageStrategy;
  public hasUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasGoogleToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  public setGoogleToken(token: string): Observable<boolean> {
    if (this._user !== null) {
      console.log('user connected, set google token:', token);

      this._googleToken = new GoogleToken();
      this._googleToken.googleToken = token
      this._storageStrategy = new SessionStrategy();
      this._storageStrategy.storeItem(`${environment.storageKeys.GOOGLE}`, JSON.stringify(this._googleToken));
      this.hasGoogleToken$.next(true);
      const observable = Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void; }) => {
        observer.next(true);
        observer.complete();
      })
      return observable;
    } else {
      const observable = Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void; }) => {
        observer.next(false);
        observer.complete();
      })
      return observable;
    }
  }

  public login(formData: any): Observable<boolean> {
    console.log('user service login POUET', formData);
    console.log(`on: ${environment.apiBaseUrl}/user/signin`);

    return this.httpClient.post<any>(
      `${environment.apiBaseUrl}/user/signin`,
      formData
    ).pipe(
      take(1),
      catchError((error: any) => of(false)),
      map((response: any) => {
        // TODO remove
        console.log('RESPONSE:', response);

        this._user = new User();
        this._user.login = formData.userLogin;
        this._user.token = response.token;
        this._user.setRoles(response.roles);

        // Get the strategy to use to store
        if (formData.stayConnected) {
          this._storageStrategy = new LocalStrategy();
        } else {
          this._storageStrategy = new SessionStrategy();
        }

        // Store the User object locally
        if (response === false) {

          this.hasUser$.next(false);
          console.log('hasuser = faux', this.hasUser$.getValue());

        } else {
          this._storageStrategy.storeItem(`${environment.storageKeys.AUTH}`, JSON.stringify(this._user))
          this.hasUser$.next(true);
          console.log('hasuser = true', this.hasUser$.getValue());

        }
        return response;
      })
    )
  };

  public logout(): void {
    console.log('user service logout TUTTUT');
    this._user = null;
    this.router.navigate(['/', 'login']);
    this._removeItem(new LocalStrategy());
    this._removeItem(new SessionStrategy());
    this.hasUser$.next(false);
  };

  public deleteGoogleToken(): void {
    this._googleToken = null;
    this._removeGoogleToken(new SessionStrategy());
    this.hasGoogleToken$.next(false);
  }

  public signup(dto: SignupDto): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiBaseUrl}/user/signup`,
      dto
    );
  }

  public hasUser(): BehaviorSubject<boolean> {
    if (!this._user) {
      this._readStorage(new LocalStrategy());
      this._readStorage(new SessionStrategy());
    }
    return this.hasUser$;
  }

  public get user(): User | null {
    return this._user;
  }

  public get googleToken(): GoogleToken | null {
    return this._googleToken;
  }

  public getGoogleTokenUserService(): GoogleToken | null {
    return this._googleToken;
  }

  public hasGoogleToken(): BehaviorSubject<boolean> {
    if (!this._googleToken) {
      this._readGoogleStorage(new SessionStrategy());
    }
    return this.hasGoogleToken$;
  }

  private _readGoogleStorage(storage: IStorageStrategy): void {
    const storedItem: string | null = storage.getItem(`${environment.storageKeys.GOOGLE}`);
    if (storedItem !== null) {
      const storedGoogleToken = JSON.parse(storedItem);
      this._googleToken = storedGoogleToken
      this.hasGoogleToken$.next(true);
    }
  }

  private _readStorage(storage: IStorageStrategy): void {
    const storedItem: string | null = storage.getItem(`${environment.storageKeys.AUTH}`);
    if (storedItem !== null) {
      const storedUser = JSON.parse(storedItem);

      this._user = new User();
      this._user.token = storedUser._token;
      this._user.setRoles(storedUser.roles);

      this.hasUser$.next(true);
    }
  }

  private _removeItem(storage: IStorageStrategy): void {
    storage.removeItem(`${environment.storageKeys.AUTH}`);
  }

  private _removeGoogleToken(storage: IStorageStrategy): void {
    storage.removeItem(`${environment.storageKeys.GOOGLE}`)
  }
}
