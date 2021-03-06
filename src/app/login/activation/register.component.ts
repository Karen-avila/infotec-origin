import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { UserService, CaptchaService } from '../../services/service.index';
import { UserActivate } from '../../models/user-activate.model';
import { environment } from 'src/environments/environment';
import * as M from 'materialize-css';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  instance;
  form:FormGroup;
  reCaptchaKey:string;
  butt=false;

  constructor(public userService:UserService, private router: Router, private captchaService:CaptchaService) { }

  ngOnInit() {

    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems,{opacity:0.7});

    this.form = new FormGroup({
      codigo: new FormControl(null, Validators.required),
      // token: new FormControl(null, Validators.required),
      // paso: new FormControl(0)
   });

   this.reCaptchaKey = environment.reCaptchaKey;

  }
  get fo() { return this.form.controls; }


  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.captchaService.review({response:captchaResponse}).subscribe(res=>{
      console.log(`Resolved: ${res}`);
      if(res){
        this.butt=res;
      }else{
        this.butt=false;
      }
      
    },err=>{
      console.log(`Resolved err: ${err}`);
    })
    
  }

  validacion(){
    this.instance[0].open();
/* let user = new UserActivate(this.form.value.codigo,this.form.value.token,"2"); */
let user = new UserActivate(this.form.value.codigo,"2");
// // ////console.log("form is valid?", this.form.valid);

if(this.form.valid){
  /* // ////console.log("form esto envio", this.form.value); */
  //enviar datos a back
  /* this.userService.createUser(this.form.value) */
  // ////console.log("register envia", user);
  this.userService.activate(user)
    .subscribe(res=>{
      // ////console.log("esto responde el servicio register",res); //revisar res.user p.ej y hacer un if(uid){openmodal}
      swal("??Felicidades!", "Usuario activo.", "success");
      this.router.navigate(["login"]);
      this.instance[0].close();
    },err=>{
      this.instance[0].close();
    });
}else{
  //algo esta mal revisa tus datos
  this.instance[0].close();
  swal("??Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
}


  }


  }
