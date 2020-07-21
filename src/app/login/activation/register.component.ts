import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { UserService } from '../../services/user/user.service';
import { UserActivate } from '../../models/user-activate.module'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor(public userService:UserService, private router: Router) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      codigo: new FormControl(null, Validators.required),
      /* token: new FormControl(null, Validators.required) */
   });

  }
  get fo() { return this.form.controls; }

  validacion(){
   
/* let user = new UserActivate(this.form.value.codigo,this.form.value.token,"2"); */
let user = new UserActivate(this.form.value.codigo,"2");
console.log("form is valid?", this.form.valid);

if(this.form.valid){
  /* console.log("form esto envio", this.form.value); */
  //enviar datos a back
  /* this.userService.createUser(this.form.value) */
  console.log("register envia", user);
  this.userService.activate(user)
    .subscribe(res=>{
      console.log("esto responde el servicio register",res); //revisar res.user p.ej y hacer un if(uid){openmodal}
      swal("¡Felicidades!", "Usuario activo.", "success");
      this.router.navigate(["login"]);
    });



  
}else{
  //algo esta mal revisa tus datos
  swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
}




  }

  
  }
