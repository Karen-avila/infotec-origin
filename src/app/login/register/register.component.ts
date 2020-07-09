import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      codigo: new FormControl(null, [Validators.required]),
      token: new FormControl(null, [Validators.required])
   });

  }
  get fo() { return this.form.controls; }

  validacion(){
    console.log("formval is valid?", this.form.valid);
    if(this.form.valid){
      console.log("formval", this.form.value);
      this.router.navigate(["dashboard"]);
      swal("¡Felicidades!", "Inicio de sesión exitoso.", "success");
      //enviar datos a back
      //this.popup[0].open();
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }
  }

  
  }
