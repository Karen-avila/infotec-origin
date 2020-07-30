import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import * as M from 'materialize-css';
import { UserService } from '../../services/user/user.service';
import { UserActivate } from '../../models/user-activate.module'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  form:FormGroup;
  reCaptchaKey:string;
  passType = "password";
  rePassType = "password";
  icon:boolean=true;
  reIcon:boolean=true;
  instance


  constructor() { }

  ngOnInit() {
    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems);
  
    this.form = new FormGroup({
      codigo: new FormControl(null, Validators.required),
      // token: new FormControl(null, Validators.required),
      // paso: new FormControl(0)
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
      rePassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
      // token: new FormControl('', [Validators.required]),
      // paso: new FormControl(0)
    }, { validators: this.equalPass('password','rePassword') });
   

   this.reCaptchaKey = environment.reCaptchaKey;

  }
  get f() { return this.form.controls; }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    // this.form.get('token').setValue(captchaResponse);

    console.log(this.form.value);

  }

  equalPass(p1:string,p2:string){

    return (group: FormGroup) => {
      let pass1 = group.controls[p1].value;
      let pass2 = group.controls[p2].value;
      if (pass1 === pass2) {
        return null;
      }
      return { isEqual: true };
    }
  }

  viewRePassword() {
    if (this.reIcon) {
      //// console.log("view repassword");
      this.reIcon = false;
      this.rePassType = "text";
    } else {
      //// console.log("not view repassword");
      this.reIcon = true;
      this.rePassType = "password";
    }
  }

  viewPassword() {
    if (this.icon) {
      //// console.log("view password");
      this.icon = false;
      this.passType = "text";
    } else {
      //// console.log("not view password");
      this.icon = true;
      this.passType = "password";
    }
  }

  validacion(){

let user = new UserActivate(this.form.value.codigo,"2");

console.log("form is valid", this.form.value);
if(this.form.valid){
  this.instance[0].open(); //revisar donde se cierra
  
  /* this.userService.activate(user)
    .subscribe(res=>{
      swal("¡Felicidades!", "Usuario activo.", "success");
      this.router.navigate(["login"]);
    }); */




}else{
  swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
}




  }


  }
