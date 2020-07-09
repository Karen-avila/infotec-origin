import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as M from 'materialize-css';

import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

import swal from 'sweetalert';

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

  passType = "password";
  icon:boolean=true;

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }

step
  constructor(public userService:UserService, private router: Router) { 
    /*this.userService.localStep().subscribe(res=>{
      
      this.re = res[0].step;
    });*/
    this.step="5";
  }

  ngOnInit() {
   // M.AutoInit();
    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems);

    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])
   });

   this.form1 = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email])
   });

  }

  get f() { return this.form.controls; }
  get fgt() { return this.form1.controls; }

  recuperarpsw(){
    console.log("form is valid?", this.form1.valid);
    if(this.form1.valid){
    console.log("form", this.form1.value);
      //enviar datos a back
    this.instance[0].open();
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
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
    
    console.log("form login is valid?", this.form.valid);
    if(this.form.valid){
      let user = new User(this.form.value.email,this.form.value.password);
      //enviar datos a back
      this.userService.login(user)
        .subscribe(res=>{
          console.log("Is logged?",res); 
         /*  console.log("Entro al step",this.step)*/
          this.router.navigate(["register",{id:this.step}]); ///revisar donde quedara

        });
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }
  }

  viewPassword(){
    if(this.icon){
      console.log("view password");
      this.icon=false;
      this.passType="text";
    }else{
      console.log("not view password");
      this.icon=true;
      this.passType="password";
    }
  }

  }
