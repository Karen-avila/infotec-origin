import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


export class LoginGuardGuard implements CanActivate {

  canActivate() {

    console.log("paso por guards");
    return true;
  }
  
}
