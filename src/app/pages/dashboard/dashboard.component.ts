import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare const MStepper: any;
import * as M from 'materialize-css';

import swal from 'sweetalert';

import { Router } from '@angular/router';

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

  //********************* */
monte;
  //********************* */
  
  model="pFisica";
  modal="falso";
  popup;
  calendar;

  terms=false;
  bc=false;

  form : FormGroup;
  formDocumentos : FormGroup;
  formFiel: FormGroup;
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
         this.monte = value.toLocaleString('es-MX', {
                  style: 'currency',
                  currency: 'MXN',
                }); 
         return '<b>Si te Prestamos: </b>MX' +  this.monte;
       case LabelType.Ceil:
         return '<b>Monto Maximo: </b>MX' + value.toLocaleString('es-MX', {
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

 catPorcentaje = 0;
 //-------------------
  constructor(public userService:UserService,private route: ActivatedRoute, private router: Router) { 

    this.route.params.subscribe( params => this.re=params);

    // Monto del Prestamo
    var montoCapital = 20000 * -1;
    // Tasa de Interes Anual
    var tasaInteresAnual = 0.15;
    // Tasa de Interes Mensual
    var tasaInteresMensual = tasaInteresAnual / 12;
    // Plazo del Credito
    var plazoCredito = 18;
    // Monto del Pago Mensual
    var pmt = this.finance.PMT(tasaInteresMensual, plazoCredito, montoCapital);
    console.log("PAGO MENSUAL ", pmt.toFixed(2));
    var pagos = [];
    pagos.push(montoCapital);
    for (var i = 0; i < plazoCredito; i++) {
        pagos.push(pmt);
    }
    var tirMensual = this.finance.IRR.apply(this, pagos);
    console.log("TIR MENSUAL " +tirMensual.toFixed(2) +"%");
    var tirAnual = tirMensual * 12;
    console.log("TIR ANUAL "+ tirAnual.toFixed(2)+"%");
    var cat = (Math.pow((1 + (tirMensual / 100)), 12)) - 1;
    console.log("CAT "+cat.toFixed(2)+"%");
    this.catPorcentaje = ((Math.pow((1 + (tirMensual / 100)), 12)) - 1) * 100;
    console.log("CAT "+ this.catPorcentaje.toFixed(2)+"%");
   

  }

  ngOnInit() {

console.log("el step",this.re.id)

    
    console.log("comienza ngOnInit",this.alrt);

    var elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);

    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    var stepperDiv = document.querySelector('.stepper');
    console.log(stepperDiv);
    var stepper = new MStepper(stepperDiv, {
      // Default active step.
      firstActive: this.re.id, //api regresa paso a activar siempre debe empezar minimo en 1
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
    name2: new FormControl(null,[Validators.minLength(0)]),
    paterno: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    materno: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    genero : new FormControl(null, Validators.required),
    birthDate : new FormControl(null, Validators.required),
    entidad : new FormControl(null, Validators.required),
    pais : new FormControl(null, Validators.required),
    ocupacion : new FormControl(null, Validators.required),
    tel: new FormControl(null,[Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
    domicilio: new FormControl(" ",[Validators.required]),
    curp: new FormControl(null,Validators.required),
    rfc: new FormControl(null,Validators.required),
    monto: new FormControl(),
    plazo: new FormControl()
            
 }, { validators: this.pbaDict('name','paterno','name2','materno','domicilio') 

});

this.formDocumentos = new FormGroup({
  frontal: new FormControl(null, Validators.required),
  reverso: new FormControl(null, Validators.required),
  comprobante: new FormControl(null, Validators.required),
  estado: new FormControl(null, Validators.required),
  curpd: new FormControl(null, Validators.required),
  rfcd: new FormControl(null, Validators.required),
 // buro: new FormControl(null, Validators.required),
  cfiscal: new FormControl(null, Validators.required)
  
  
});
this.formFiel = new FormGroup({
  
  fiel: new FormControl(null, Validators.required),
  cer: new FormControl(null, Validators.required),
  password: new FormControl(null, Validators.required)
  
  
});


  
 
  }

  get f() { return this.form.controls; }
  get doc() { return this.formDocumentos.controls; }
  get fi() { return this.formFiel.controls; }
  
 

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

  ValidateSize(file) {
    console.log("onchanges")
    let fl = (<HTMLInputElement>document.getElementById(file));
    let FileSize = fl.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
        //alert('File size exceeds 2 MB');
        swal("¡Cuidado!", "Tu archivo debe ser menor a 2Mb", "warning");
        fl.value = null;
       // $(file).val(''); //for clearing with Jquery
    } else {

    }
}

  dpersonales(){
    console.log("form is valid?", this.form.valid);
    if(this.form.valid){
      console.log("form", this.form.value);
      //enviar datos a back
      //this.popup[0].open();
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }

  }
  dfiel(){
    console.log("formFiel is valid?", this.formFiel.valid);
    if(this.formFiel.valid){
      console.log("formFiel", this.formFiel.value);
      //enviar datos a back
      this.popup[0].open();
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
    }

  }

  ddocumentos(){
    console.log("formDocumentos is valid?", this.formDocumentos.valid);
    if(this.formDocumentos.valid){
      console.log("formDocumentos", this.formDocumentos.value);
      //enviar datos a back
      this.popup[0].open();
    } else{
      swal("¡Cuidado!", "Para poder continuar, completa correctamente todos los campos.", "error");
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

  viewMap(){
    console.log("map")
    document.getElementById("steps").classList.add("hide");
    document.getElementById("modalMap").classList.remove("hide");
    //this.router.navigate(["map"]);
  }

  mapOk(){
    console.log("map")
    document.getElementById("steps").classList.remove("hide");
    document.getElementById("modalMap").classList.add("hide");
    //this.router.navigate(["map"]);
  }



  rFiscal(){
  console.log("Reviso valor de check", this.model);
  if(this.model){
    this.form.get("pFisica").setValue(" ") 
  }

}

}
