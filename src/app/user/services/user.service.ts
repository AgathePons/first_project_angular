import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IStorageStrategy } from 'src/app/core/strategies/storage/i-storage-strategy';
import { LocalStrategy } from 'src/app/core/strategies/storage/local-strategy';
import { SessionStrategy } from 'src/app/core/strategies/storage/session-strategy';
import { environment } from 'src/environments/environment';
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
    this._removeItem(new LocalStrategy());
    this._removeItem(new SessionStrategy());
    this.hasUser$.next(false);
  };

  public hasUser(): BehaviorSubject<boolean> {
    if (!this._user) {
      this._readStorage(new LocalStrategy());
      this._readStorage(new SessionStrategy());
    }
    return this.hasUser$;
  }

  private _readStorage(storage: IStorageStrategy): void {
    const storedItem: string | null = storage.getItem(`${environment.storageKeys.AUTH}`);
    if (storedItem !== null) {
      const storedUser = JSON.parse(storedItem);

      this._user = new User();
      this._user.id = storedUser._id;
      this._user.login = storedUser._login;

      this.hasUser$.next(true);
    }
  }

  private _removeItem(storage: IStorageStrategy): void {
    storage.removeItem(`${environment.storageKeys.AUTH}`);
  }
}
