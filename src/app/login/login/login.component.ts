import { Component, OnInit } from '@angular/core';


import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  output: any;
  signInForm: NgForm;
  recaptcha: any[];

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }


  constructor(private router: Router) { }

  ngOnInit() {

  }

  onSignInSubmit() {

   // this.output = null;

console.log("login component")
this.router.navigate(["dashboard"]);
  }
  recuperar(){
    console.log("Recuperar");
   // M.Modal.open(); //Abrir pop up de cambio de contraseña
  }

  cancel(){
    console.log("cancelar");
    document.getElementById("login").classList.remove("hide");
    document.getElementById("forgot").classList.add("hide");
  }

  forgot(){
    console.log("forgot");
    document.getElementById("login").classList.add("hide");
    document.getElementById("forgot").classList.remove("hide");
  }

  }
