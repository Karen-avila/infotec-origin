import { Component, OnInit } from '@angular/core';

declare const MStepper: any;
import * as M from 'materialize-css';
import { format } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model="falso";
  modal="falso";
 
  constructor() { }

  ngOnInit() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, format);

    var select = document.querySelectorAll('select');
    var instances = M.FormSelect.init(select);

    var stepperDiv = document.querySelector('.stepper');
    console.log(stepperDiv);
    var stepper = new MStepper(stepperDiv, {
      // Default active step.
      firstActive: 2, //api regresa paso a activar
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


}
