import { Injectable } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(
    private userService: UserService,
  ) { }

  Init() {
    return new Promise<void>((resolve, reject) => {
        console.log("AppInitService.init() called");
        this.userService.setUserStorage();
        resolve();
    });
}
}
