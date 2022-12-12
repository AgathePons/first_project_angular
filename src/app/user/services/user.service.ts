import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor() { }

  public login(formData: any): Observable<boolean> {
    console.log('user service login POUET', formData);
    const userIndex: number = users.findIndex((user: UserDto) => user.login === formData.userLogin && user.password === formData.userPassword)
    if (userIndex === -1) {
      return of(false);
    }
    this._user = new User();
    this._user.id = users[userIndex].id!;
    this._user.login = users[userIndex].login;

    return of(true);
  };

  public logout(): void {
    console.log('user service logout TUTTUT');

  };
}
