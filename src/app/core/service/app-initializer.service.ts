import { APP_INITIALIZER, Injectable } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(
    private _userService: UserService,
  ) { }

  init() {
    return new Promise<void>((resolve, reject) => {
        console.log("AppInitService.init() called");
        this._userService.hasUser();
        // TODO before: this._userService.setUserStorage();
        resolve();
    });
  }
}

export const initializeApp = (appInitService: AppInitializerService): any => {
  return (): Promise<void> => {
    return appInitService.init();
  }
}

export const appInit = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp, // Utilise la fonction qui instancie le service et appelle la méthode init()
  deps: [ // DI à la main
    AppInitializerService
  ],
  multi: true
}
