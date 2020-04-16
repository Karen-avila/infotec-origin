import { Component, OnInit } from '@angular/core';
declare const MStepper: any;
import * as M from 'materialize-css';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  recaptcha: any[];

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

  }


  checkEmailDB(){
    console.log("hi");
  }
  

}
