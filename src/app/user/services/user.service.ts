import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IStorageStrategy } from 'src/app/core/strategies/storage/i-storage-strategy';
import { LocalStrategy } from 'src/app/core/strategies/storage/local-strategy';
import { SessionStrategy } from 'src/app/core/strategies/storage/session-strategy';
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
  ) { }

  public setUserStorage(): void {
    const userString = localStorage.getItem('auth');
        if (userString !== null) {
          const userJSON = JSON.parse(userString);
          console.log('get user:', userJSON);
          this._user = new User();
          this._user.id = userJSON._id;
          this._user.login = userJSON._login;
          console.log(this._user);
          this.hasUser$.next(true);
        } else {
          this.hasUser$.next(false);
        }
  }

  public login(formData: any): Observable<boolean> {
    console.log('user service login POUET', formData);
    const userIndex: number = users.findIndex((user: UserDto) => user.login === formData.userLogin && user.password === formData.userPassword)
    if (userIndex === -1) {
      this.hasUser$.next(false);
      return of(false);
    }
    this._user = new User();
    this._user.id = users[userIndex].id!;
    this._user.login = users[userIndex].login;
    this.hasUser$.next(true);
    // get the strategy to use
    if (formData.stayConnected) {
      this._storageStrategy = new LocalStrategy();
    } else {
      this._storageStrategy = new SessionStrategy();
    }
    // store the user object locally
    this._storageStrategy.storeItem('auth', JSON.stringify(this._user))
    return of(true);
  };

  public logout(): void {
    console.log('user service logout TUTTUT');
    this._user = null;
    this.router.navigate(['/', 'login']);
    this.hasUser$.next(false);
  };

  public hasUser(): BehaviorSubject<boolean> {
    return this.hasUser$;
  }
}
