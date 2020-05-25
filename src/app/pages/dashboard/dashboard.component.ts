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
stepper;
  //********************* */
  
  model="pFisica";
  modal="falso";
  popup;
  calendar;

  terms=false;
  bc=false;
  aviso = false;
  prueba = false;

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
    //{name:"Buro de crédito",
    //url:"https://www.burodecredito.com.mx/score-info.html"},
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
   maxLimit: 18,
   translate: (value: number, label: LabelType): string => {
     switch (label) {
       case LabelType.Low:
        return '<b>' + value + ' Meses + 3 meses de gracia</b>';
       case LabelType.Ceil:
        return '<b> Total 21 Meses </b>';
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

    this.re = localStorage.getItem('step');

    // Monto del Prestamo
    var montoCapital = 20000 * -1;
    // Tasa de Interes Anual
    var tasaInteresAnual = 0.12; // cambio a 12
    // Tasa de Interes Mensual
    var tasaInteresMensual = tasaInteresAnual / 12;
    // Plazo del Credito
    var plazoCredito = 18;
    // Monto del Pago Mensual
    var pmt = this.finance.PMT(tasaInteresMensual, plazoCredito, montoCapital);
    //console.log("PAGO MENSUAL ", pmt.toFixed(2));
    var pagos = [];
    pagos.push(montoCapital);
    for (var i = 0; i < plazoCredito; i++) {
        pagos.push(pmt);
    }
    var tirMensual = this.finance.IRR.apply(this, pagos);
    //console.log("TIR MENSUAL " +tirMensual.toFixed(2) +"%");
    var tirAnual = tirMensual * 12;
    //console.log("TIR ANUAL "+ tirAnual.toFixed(2)+"%");
    var cat = (Math.pow((1 + (tirMensual / 100)), 12)) - 1;
    //console.log("CAT "+cat.toFixed(2)+"%");
    this.catPorcentaje = ((Math.pow((1 + (tirMensual / 100)), 12)) - 1) * 100;
    //console.log("CAT "+ this.catPorcentaje.toFixed(2)+"%");
   

  }

  ngOnInit() {

console.log("el step",this.re)


    //console.log("comienza ngOnInit",this.alrt);

    let elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);

    let select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    let stepperDiv = document.getElementById('api_nav_demo');
    //console.log(stepperDiv);
    this.stepper = new MStepper(stepperDiv, {
      // Default active step.
      firstActive: this.re, //api regresa paso a activar siempre debe empezar minimo en 1
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
    clabe: new FormControl(null,[Validators.required,Validators.minLength(18), Validators.maxLength(18), Validators.pattern('[0-9]{18}')]),
    tel: new FormControl(null,[Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
    domicilio: new FormControl(" ",[Validators.required]),
    curp: new FormControl(null,Validators.required),
    rfc: new FormControl(null,Validators.required),
    civil: new FormControl(null,Validators.required),
    clave: new FormControl(null,Validators.required),
    calle: new FormControl(null,Validators.required),
    ext: new FormControl(null,Validators.required),
    int: new FormControl(null,[Validators.minLength(0)]),
    mun: new FormControl(null,Validators.required),
    asentamiento: new FormControl(null,Validators.required),
    tase: new FormControl(null,Validators.required),
    callen: new FormControl(null,Validators.required),
    extn: new FormControl(null,Validators.required),
    intn: new FormControl(null,[Validators.minLength(0)]),
    munn: new FormControl(null,Validators.required),
    asentamienton: new FormControl(null,Validators.required),
    tasen: new FormControl(null,Validators.required),
    sector: new FormControl(null,Validators.required),
    ssector: new FormControl(null,Validators.required),
    rama: new FormControl(null,Validators.required),
    srama: new FormControl(null,Validators.required),
    giro: new FormControl(null,Validators.required),
    namerp1: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    name2rp1: new FormControl(null,[Validators.minLength(0)]),
    paternorp1: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    maternorp1: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    telrp1: new FormControl(null,[Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
    relacionrp1: new FormControl(null,Validators.required),
    namerp2: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    name2rp2: new FormControl(null,[Validators.minLength(0)]),
    paternorp2: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    maternorp2: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    telrp2: new FormControl(null,[Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
    relacionrp2: new FormControl(null,Validators.required),
    monto: new FormControl(),
    plazo: new FormControl()
            
 }, { validators: this.pbaDict('name','paterno','name2','materno','domicilio','calle','ext','int','mun','asentamiento','callen','extn','intn','munn','asentamienton',
 'namerp1','paternorp1','name2rp1','maternorp1', 'namerp2','paternorp2','name2rp2','maternorp2') 

});

this.formDocumentos = new FormGroup({
  frontal: new FormControl(null, Validators.required),
  reverso: new FormControl(null, Validators.required),
  comprobante: new FormControl(null, Validators.required),
  comprobanten: new FormControl(null, Validators.required),
  estado: new FormControl(null, Validators.required),
  declaracion: new FormControl(null, Validators.required),
  curpd: new FormControl(null, Validators.required),
  rfcd: new FormControl(null, Validators.required),
  fiscal: new FormControl(null, Validators.required)
  // buro: new FormControl(null, Validators.required)
  
  
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
  
 

  pbaDict(p1:string,p2:string,p3:string,p4:string,p5:string,
    p6:string,p7:string,p8:string,p9:string,p10:string,
    p11:string,p12:string,p13:string,p14:string,p15:string,
    p16:string,p17:string,p18:string,p19:string,
    p20:string,p21:string,p22:string,p23:string){

    return ( group:FormGroup)=>{
      let val1 = group.controls[p1].value;
      let val2 = group.controls[p2].value;
      let val3 = group.controls[p3].value;
      let val4 = group.controls[p4].value;
      let val5 = group.controls[p5].value;
      let val6 = group.controls[p6].value;
      let val7 = group.controls[p7].value;
      let val8 = group.controls[p8].value;
      let val9 = group.controls[p9].value;
      let val10 = group.controls[p10].value;
      let val11 = group.controls[p11].value;
      let val12 = group.controls[p12].value;
      let val13 = group.controls[p13].value;
      let val14 = group.controls[p14].value;
      let val15 = group.controls[p15].value;
      let val16 = group.controls[p16].value;
      let val17 = group.controls[p17].value;
      let val18 = group.controls[p18].value;
      let val19 = group.controls[p19].value;
      let val20 = group.controls[p20].value;
      let val21 = group.controls[p21].value;
      let val22 = group.controls[p22].value;
      let val23 = group.controls[p23].value;
      
      for(let i of this.dic){
        //console.log("compare",val1,"vs",i)
      if(val1  === i || val2 === i || val3 === i || val4 === i || val5 === i || val6  === i || val7 === i 
        || val8 === i || val9 === i || val10 === i || val11  === i || val12 === i || val13 === i || val4 === i 
        || val15 === i || val16  === i || val17 === i || val18 === i || val9 === i || val20  === i || val21 === i || val22 === i || val23 === i){
        return {isMatch:true};
      }
      
  
    }
  
    }
    
  }

  ValidateSize(file) {
    //console.log("onchanges")
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
      this.stepper.openStep(3);
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
      //this.popup[0].open();
      this.stepper.openStep(4);
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
    //console.log("map")
    document.getElementById("steps").classList.add("hide");
    document.getElementById("modalMap").classList.remove("hide");
    //this.router.navigate(["map"]);
  }

  mapOk(){
    //console.log("map")
    document.getElementById("steps").classList.remove("hide");
    document.getElementById("modalMap").classList.add("hide");
    //this.router.navigate(["map"]);
  }



  rFiscal(){
  //console.log("Reviso valor de check", this.model);
  if(this.model){
    this.form.get("pFisica").setValue(" ") 
  }

}

}
