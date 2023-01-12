import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, take } from 'rxjs';
import { IStorageStrategy } from 'src/app/core/strategies/storage/i-storage-strategy';
import { LocalStrategy } from 'src/app/core/strategies/storage/local-strategy';
import { SessionStrategy } from 'src/app/core/strategies/storage/session-strategy';
import { environment } from 'src/environments/environment';
import { SignupDto } from '../dto/signup-dto';
import { UserDto } from '../dto/user-dto';
import { User } from '../models/user';

// TODO remove after wiring to backend
const users: UserDto[] = [
  {
    id: 1,
    login: 'admin',
    password: '000',
  },
  {
    id: 2,
    login: 'guest',
    password: '111',
  },
];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;
  private _storageStrategy!: IStorageStrategy;
  public hasUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { }

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
        this._storageStrategy.storeItem(`${environment.storageKeys.AUTH}`, JSON.stringify(this._user));
        if (response === false) {
          
          this.hasUser$.next(false);
          console.log('hasuser = faux', this.hasUser$.getValue());
        
        } else {

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

  public signup(dto: SignupDto): Observable<any> {
    // TODO remove
    console.log('userService > signup');

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
}
