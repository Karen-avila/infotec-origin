import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare const MStepper: any;
import * as M from 'materialize-css';

import swal from 'sweetalert';

import { UserService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';

import { Options, LabelType } from 'ng5-slider';
import { Finance } from 'financejs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  model="pFisica";
  modal="falso";
  popup;
  calendar;

  terms=false;

  form : FormGroup;
  formDocumentos : FormGroup;
  dic = [
    "apañar",
    "cagar",
    "cojo",
    "chingada",
    "APAÑAR",
    "ARRABALERA",
    "ASESINAR",
    "ASESINO",
    "ASSHOLE",
  ]

  alrt = [
    {name:"Curp",
     url:"https://www.gob.mx/curp/"},
    {name:"Rfc",
    url:"https://www.siat.sat.gob.mx/PTSC/"},
    {name:"Buro de crédito",
    url:"https://www.burodecredito.com.mx/score-info.html"},
    {name:"Constancia de Situación Fiscal",
    url:"https://www.sat.gob.mx/aplicacion/53027/genera-tu-constancia-de-situacion-fiscal"}
  ]
 re;

 //-------------------
 valueMon: number = 20000;
 optionsMon: Options = {
   floor: 0,
   ceil: 50000,
   step: 10000,
   minLimit: 20000,
   translate: (value: number, label: LabelType): string => {
     switch (label) {
       case LabelType.Low:
         return '<b>Si te Prestamos: </b>' +  value.toLocaleString('es-MX', {
           style: 'currency',
           currency: 'MXN',
         }); 
       case LabelType.Ceil:
         return '<b>Monto Maximo: </b>' + value.toLocaleString('es-MX', {
           style: 'currency',
           currency: 'MXN',
         });
       default:
         return '<b>Monto</b>';
     }
         //return '<b>Si te Prestamos:</b> $' + value;
   }
 };
 valuePlaz: number = 18;
 optionsPlaz: Options = {
   floor: 0,
   ceil: 36,
   step: 18,
   minLimit: 18,
   translate: (value: number, label: LabelType): string => {
     switch (label) {
       case LabelType.Low:
         return '<b>' + value + ' Meses</b>';
       case LabelType.Ceil:
         return '<b>' + value + ' Meses</b>';
       default:
         return '<b>Plazo</b>';
     }
         //return '<b>Si te Prestamos:</b> $' + value;
   }
 };
 
 finance = new Finance();
 //-------------------
  constructor(public userService:UserService,private route: ActivatedRoute) { 

    this.route.params.subscribe( params => this.re=params);
   

  }

  ngOnInit() {

console.log("el step",this.re.id)

    
    console.log("comienza ngOnInit",this.alrt);

    var elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);

    var elems = document.querySelectorAll('.datepicker');
    this.calendar = M.Datepicker.init(elems);
    console.log("heyy",this.calendar)


    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    var stepperDiv = document.querySelector('.stepper');
    console.log(stepperDiv);
    var stepper = new MStepper(stepperDiv, {
      // Default active step.
      firstActive: 4, //api regresa paso a activar siempre debe empezar minimo en 1
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
  
   this.form = new FormGroup({
    personType: new FormControl(null,Validators.required),
    name: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    name2: new FormControl(null,[Validators.minLength(3)]),
    paterno: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    materno: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    domicilio: new FormControl(null,[Validators.required,Validators.minLength(5), Validators.maxLength(120)]),
    curp: new FormControl(null,Validators.required),
    rfc: new FormControl(null,Validators.required),
    genero : new FormControl(null, Validators.required)
    //phone: new FormControl (null, [Validators.required, Validators.minLength(10)])
   
    
 }, { validators: this.pbaDict('name','paterno','name2','materno','domicilio') 

});

this.formDocumentos = new FormGroup({
  frontal: new FormControl(null, Validators.required),
  reverso: new FormControl(null, Validators.required),
  comprobante: new FormControl(null, Validators.required),
  estado: new FormControl(null, Validators.required),
  curpd: new FormControl(null, Validators.required),
  rfcd: new FormControl(null, Validators.required),
  buro: new FormControl(null, Validators.required),
  cfiscal: new FormControl(null, Validators.required)
  
});
  
 
  }

  get f() { return this.form.controls; }
  get doc() { return this.formDocumentos.controls; }
 

  pbaDict(p1:string,p2:string,p3:string,p4:string,p5:string){

    return ( group:FormGroup)=>{
      let val1 = group.controls[p1].value;
      let val2 = group.controls[p2].value;
      let val3 = group.controls[p3].value;
      let val4 = group.controls[p4].value;
      let val5 = group.controls[p5].value;
      
      for(let i of this.dic){
        console.log("compare",val1,"vs",i)
      if(val1  === i || val2 === i || val3 === i || val4 === i || val5 === i){
        return {isMatch:true};
      }
      
  
    }
  
    }
    
  }

  dpersonales(){
    console.log("form is valid?", this.form.valid);
    if(this.form.valid){
      console.log("form", this.form.value);
      //enviar datos a back
      this.popup[0].open();
    } 

  }

  ddocumentos(){
    console.log("formDocumentos is valid?", this.formDocumentos.valid);
    if(this.formDocumentos.valid){
      console.log("formDocumentos", this.formDocumentos.value);
      //enviar datos a back
      this.popup[0].open();
    } 

  }

  sweetHome(id){
   /* swal('Importante',
    'Para obtener su CURP debera obtenerlo de https://www.gob.mx/curp/, puede acceder dando click en el boton de abajo',
    'info', 
    {buttons: ["Cancelar", "Consultar Curp"]},
    
    );*/

    swal({
      title: "Importante",
      text: "Para obtener su " + this.alrt[id].name + " debera obtenerlo de " + this.alrt[id].url + " puede acceder dando click en el boton de abajo",
      icon: "info",
      buttons: { 
        d:{
        text: "Cancelar",
        value: false,
        visible: true,
        className: "",
        closeModal: true,
      },
        j:{
          text: "Consultar " + this.alrt[id].name,
          value: true,
          visible: true,
          className: "red darken-4",
          closeModal: true,
        }
      }
      
     
        }).then((value)=>{
          if(value){
            window.open(this.alrt[id].url, '_blank');
          }       
     });

    
  }

}
