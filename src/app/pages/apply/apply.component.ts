import { Component, OnInit } from '@angular/core';
declare const MStepper: any;
import * as M from 'materialize-css';

//-------------
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  
  recaptcha: any[];
  //-------
  form : FormGroup;
  dic = [
    "apañar",
    "cagar",
    "cojo",
    "chingada"
  ]
  //-------

  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }

  constructor() {
    
  }

  ngOnInit() {

    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    
    var select = document.querySelectorAll('select');
    var instances = M.FormSelect.init(select);

    var stepperDiv = document.querySelector('.stepper');
    console.log(stepperDiv);
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
      password: new FormControl(null, Validators.required),
      rePassword: new FormControl(null, Validators.required)
   }, { validators: this.equalPass('password','rePassword') });

   //validators: this.pbaDict('password') 

//------------------------   
  }


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
      console.log("compare",val1,"vs",i)
    if(val1 === i){
      return {isMatch:true};
    }
    

  }

  }
  
}
//------------

  //-------------
  register(){
    console.log("form is valid?", this.form.valid);
    if(this.form.valid){
      console.log("form", this.form.value);
      //enviar datos a back
    } 
  }
  //-------------
  

}
