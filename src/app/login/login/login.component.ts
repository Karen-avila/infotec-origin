import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as M from 'materialize-css';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  instance
  output: any;
  signInForm: NgForm;
  recaptcha: any[];

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }


  constructor(private router: Router) { }

  ngOnInit() {
   // M.AutoInit();
    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems);

    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
   });
  
  
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

  login(){
    console.log("form is valid?", this.form.valid);
    if(this.form.valid){
      console.log("form", this.form.value);
      //enviar datos a back
      this.router.navigate(["dashboard"]);
     
    } 
  }





  }
