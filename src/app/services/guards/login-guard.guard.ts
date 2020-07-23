import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate() {
    // console.log("en can activate ",this.userService.isLogged())
    if (this.userService.isLogged()) {
      // console.log("paso por guard");
      return true;
    } else {
      // console.log("Bloqueado por guard");
      this.router.navigate(["login"]);
      return false;
    }
  }

}
