import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as M from 'materialize-css';

import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  form1 : FormGroup;
  instance
  output: any;
  signInForm: NgForm;
  recaptcha: any[];

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }


  constructor(public userService:UserService, private router: Router) { }

  ngOnInit() {
   // M.AutoInit();
    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems);

    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
   });

   this.form1 = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email])
   });

  }

  recuperarpsw(){
    console.log("form is valid?", this.form1.valid);
    if(this.form1.valid){
    console.log("form", this.form1.value);
      //enviar datos a back
    this.instance[0].open();
    } 
  }

  onSignInSubmit() {

   // this.output = null;

console.log("login component")
this.router.navigate(["dashboard"]);
  }

  
  recuperar(){
    console.log("Recuperar");
    //M.Modal.open(); //Abrir pop up de cambio de contraseña
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
    let user = new User(this.form.value.email,this.form.value.password);
    console.log("form is valid?", this.form.valid);
    if(this.form.valid){
      console.log("form esto envio", this.form.value);
      //enviar datos a back
      this.userService.login(user)
        .subscribe(res=>{
          console.log("esto responde el servicio login",res); //revisar res.user p.ej y hacer un if(uid){openmodal}
        });
      this.router.navigate(["dashboard"]);//revisar donde quedara
     
    } 
  }

  }
