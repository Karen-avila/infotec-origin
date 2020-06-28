import { Component, OnInit } from '@angular/core';
declare const MStepper: any;
import * as M from 'materialize-css';

import swal from 'sweetalert';
import { Router } from '@angular/router';

//-------------
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  instance 
  popup;
  recaptcha: any[];
  //-----
  form : FormGroup;
  formval: FormGroup;
  dic = [
    "apañar",
    "cagar",
    "cojo",
    "chingada"
  ]
  //-------
  passType = "password";
  rePassType = "password";
  icon:boolean=true;
  reIcon:boolean=true;


  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }

  constructor(public userService:UserService, private router: Router) {
    
  }

  ngOnInit() {

    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems);
    
    var select = document.querySelectorAll('select');
    var instances = M.FormSelect.init(select);

    var stepperDiv = document.querySelector('.stepper');
    //console.log(stepperDiv);
    var stepper = new MStepper(stepperDiv, {
      // Default active step.
      firstActive: 0,
      // Allow navigation by clicking on the next and previous steps on linear steppers.
      linearStepsNavigation: true,
      // Auto focus on first input of each step.
      autoFocusInput: false,
      // Set if a loading screen will appear while feedbacks functions are running.
      showFeedbackPreloader: true,
      // Auto generation of a form around the stepper.
      autoFormCreation: true,
      // Enable or disable navigation by clicking on step-titles
      stepTitleNavigation: false,
      // Preloader used when step is waiting for feedback function. If not defined, Materializecss spinner-blue-only will be used.
      feedbackPreloader: '<div class="spinner-layer spinner-blue-only">...</div>'
   })

//----------------------


   this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      rePassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])
   }, { validators: this.equalPass('password','rePassword') });

   //validators: this.pbaDict('password') 

//------------------------   
   this.formval = new FormGroup({
    codigo: new FormControl(null,[Validators.required, Validators.minLength(3),  Validators.maxLength(3), Validators.pattern('[0-9]{3}')]),
    token: new FormControl(null, [Validators.required, Validators.minLength(3),  Validators.maxLength(3), Validators.pattern('[0-9]{3}')])
 }
 );

  }

  get f() { return this.form.controls; }
  get fo() { return this.formval.controls; }
//------------

equalPass(p1:string,p2:string){

  return ( group:FormGroup)=>{
    let pass1 = group.controls[p1].value;
    let pass2 = group.controls[p2].value;
    if(pass1 === pass2){
      return null;
    }
    return{isEqual:true};
  }
}

pbaDict(p1:string){

  return ( group:FormGroup)=>{
    let val1 = group.controls[p1].value;
    
    for(let i of this.dic){
      //console.log("compare",val1,"vs",i)
    if(val1 === i){
      return {isMatch:true};
    }
    

  }

  }
  
}
//------------

  //-------------
  register() {
    let user = new User(this.form.value.email,this.form.value.password,this.form.value.rePassword);

    console.log("form is valid?", this.form.valid);

    if(this.form.valid){
      console.log("form esto envio", this.form.value);
      //enviar datos a back
      this.userService.createUser(this.form.value)
        .subscribe(res=>{
          console.log("esto responde el servicio register",res); //revisar res.user p.ej y hacer un if(uid){openmodal}
        });

        //this.userService.createUserL(user);


      this.instance[0].open(); //revisar donde quedara
    }else{
      //algo esta mal revisa tus datos
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }

  }
  //-------------
  viewRePassword(){
    if(this.reIcon){
      //console.log("view repassword");
      this.reIcon=false;
      this.rePassType="text";
    }else{
      //console.log("not view repassword");
      this.reIcon=true;
      this.rePassType="password";
    }
  }

  viewPassword(){
    if(this.icon){
      //console.log("view password");
      this.icon=false;
      this.passType="text";
    }else{
      //console.log("not view password");
      this.icon=true;
      this.passType="password";
    }
  }

  validacion(){
    console.log("formval is valid?", this.formval.valid);
    if(this.formval.valid){
      console.log("formval", this.formval.value);
      this.router.navigate(["login"]);
      //enviar datos a back
      //this.popup[0].open();
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }

  }

}
