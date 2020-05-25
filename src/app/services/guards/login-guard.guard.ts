import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';


export class LoginGuardGuard implements CanActivate {

  constructor(public userService:UserService){}

  canActivate() {
if(this.userService.isLogged()){
    console.log("paso por guard");
    return true;
  }else{
    console.log("Bloqueado por guard");
    return false;
  }
  }
  
}
