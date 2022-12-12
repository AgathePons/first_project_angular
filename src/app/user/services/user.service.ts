import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// TODO remove after wiring to backend
const users: any[] = [
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

  constructor() { }

  public login(formData: any): Observable<boolean> {
    console.log('user service login POUET', formData);
    return of(
      users.findIndex((user: any) => {
        return user.login === formData.userLogin && user.password === formData.userPassword
      }) !== -1
    );
  };

  public logout(): void {
    console.log('user service logout TUTTUT');

  };
}
