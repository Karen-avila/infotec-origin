import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as M from 'materialize-css';

import { UserService } from '../../services/service.index';
import { UserLog } from '../../models/user-log.module';

import swal from 'sweetalert';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

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
  reCaptchaKey: string;

  passType = "password";
  icon:boolean=true;

step
  constructor(public userService:UserService, private router: Router) {
    /*this.userService.localStep().subscribe(res=>{

      this.re = res[0].step;
    });*/
    //this.step="2";
    /* localStorage.setItem('step','2');
    this.step = localStorage.getItem('step'); */
// console.log("")
    if(localStorage.getItem('step')){
      this.step = localStorage.getItem('step');
    }else{
      localStorage.setItem('step','1');
    }
  }

  ngOnInit() {
   // M.AutoInit();
    this.reCaptchaKey = environment.reCaptchaKey;
    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems);

    this.form = new FormGroup({/* '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}' */
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}')
      ]),
      // token: new FormControl(null, Validators.required),
      // paso: new FormControl(0)
    });

   this.form1 = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email])
   });

  }

  get f() { return this.form.controls; }
  get fgt() { return this.form1.controls; }

  recuperarpsw(){
    // console.log("form is valid?", this.form1.valid);
    if(this.form1.valid){
    // console.log("form", this.form1.value);
      //enviar datos a back
    this.instance[0].open();
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }
  }

  onSignInSubmit() {

   // this.output = null;

// console.log("login component")
this.router.navigate(["dashboard"]);
  }


  recuperar(){
    // console.log("Recuperar");
    //M.Modal.open(); //Abrir pop up de cambio de contraseña
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    // this.form.get('token').setValue(captchaResponse);

    console.log(this.form.value);

  }

  cancel(){
    // console.log("cancelar");
    document.getElementById("login").classList.remove("hide");
    document.getElementById("forgot").classList.add("hide");
  }

  forgot(){
    // console.log("forgot");
    document.getElementById("login").classList.add("hide");
    document.getElementById("forgot").classList.remove("hide");
  }

  login(){

    console.log("form login is valid?", this.form.valid);
    if(this.form.valid){
      
      
      var user:UserLog;
      if(environment.passwordShaded){
          user = new UserLog(this.form.value.email,
          this.userService.createHash(this.form.value.password));
      }
       else {
        user = new UserLog(this.form.value.email,
          this.form.value.password);
       }
      
       
      this.userService.login(user)
        .subscribe(res=>{
          this.router.navigate(["dashboard",{email:this.form.value.email}]);
         /*  this.router.navigate(["dashboard"]);  */
          //this.router.navigate(["register",{id:this.step}]); ///revisar donde quedara

        });
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }
  }

  viewPassword(){
    if(this.icon){
      this.icon=false;
      this.passType="text";
    }else{
      this.icon=true;
      this.passType="password";
    }
  }

  }
