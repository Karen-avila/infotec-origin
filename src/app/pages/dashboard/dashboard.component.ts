import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { Options, LabelType } from 'ng5-slider';
import { Finance } from 'financejs';
import * as M from 'materialize-css';
import swal from 'sweetalert';
import activitiesService from './service/activities.service';
import { EventManager } from '@angular/platform-browser';
declare const MStepper: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
activities = {
  sectorList: [],
  subsectorList: [],
  ramaList: [],
  subramaList: [],
  giroList: []
};
negocio = {
  cp: '',
  estado: '',
  tipo_asentamiento: '',
  municipio: '',
  asentamiento: [],
};
infoPersonal = {
  calle: '',
  latitude: 0,
  longitude: 0,
};
personal = {
  cp: '',
  estado: '',
  tipo_asentamiento: '',
  municipio: '',
  asentamiento: [],
};
questionForm = {};
monte;
stepper;
  
  model="pFisica";
  modal="falso";
  popup;
  calendar;
  terms=false;
  autorizobc=false;
  aprivacidad = false;
  termcond = false;
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
    {name:"Curp", url:"https://www.gob.mx/curp/"},
    {name:"Rfc", url:"https://www.siat.sat.gob.mx/PTSC/"},
    {name:"Constancia de Situación Fiscal", url:"https://www.sat.gob.mx/aplicacion/53027/genera-tu-constancia-de-situacion-fiscal"}
    //{name:"Buro de crédito", url:"https://www.burodecredito.com.mx/score-info.html"},
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
 // -------------------
constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private eventManager: EventManager
  ) {
  this.re = localStorage.getItem('step');
  this.eventManager.addGlobalEventListener(
    'window',
    'message',
    (msg) => {
      if (msg.data.latitude && msg.data.longitude) {
        this.infoPersonal.calle = msg.data.name;
        this.infoPersonal.latitude = msg.data.latitude;
        this.infoPersonal.longitude = msg.data.longitude;
      }
      this.mapOk();
      if (msg.data.questions) {
        this.popup[0].open();
        console.log(msg.data);
      }
    }
  );

  // Monto del Prestamo
  const montoCapital = 20000 * -1;
  // Tasa de Interes Anual
  const tasaInteresAnual = 0.12; // cambio a 12
  // Tasa de Interes Mensual
  const tasaInteresMensual = tasaInteresAnual / 12;
  // Plazo del Credito
  const plazoCredito = 18;
  // Monto del Pago Mensual
  const pmt = this.finance.PMT(tasaInteresMensual, plazoCredito, montoCapital);
  // console.log("PAGO MENSUAL ", pmt.toFixed(2));
  const pagos = [];
  pagos.push(montoCapital);
  for (let i = 0; i < plazoCredito; i++) {
      pagos.push(pmt);
  }
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
    });
    this.form = new FormGroup({
      personType: new FormControl(null, Validators.required),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      name2: new FormControl(null, [Validators.minLength(0)]),
      a_paterno: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      a_materno: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      genero : new FormControl(null, Validators.required),
      birthDate : new FormControl(null, Validators.required),
      entidadfed : new FormControl(null, Validators.required),
      entidadfedNeg : new FormControl(null, Validators.required),
      pais : new FormControl(null, Validators.required),
      ocupacion : new FormControl(null, Validators.required),
      // tslint:disable-next-line: max-line-length
      clabe_inter: new FormControl(null, [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('[0-9]{18}')]),
      tel: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      domicilio: new FormControl(' ', [Validators.required]),
      curp: new FormControl(null, Validators.required),
      rfc: new FormControl(null, Validators.required),
      civil: new FormControl(null, Validators.required),
      clave_elector: new FormControl(null, Validators.required),
      calle: new FormControl(null, Validators.required),
      ext: new FormControl(null, Validators.required),
      int: new FormControl(null, [Validators.minLength(0)]),
      cp: new FormControl(null, Validators.required),
      municipio: new FormControl(null, Validators.required),
      asentamiento: new FormControl(null, Validators.required),
      asentamientoType: new FormControl(null, Validators.required),
      calleNeg: new FormControl(null, Validators.required),
      cpNeg: new FormControl(null, Validators.required),
      extNeg: new FormControl(null, Validators.required),
      intNeg: new FormControl(null, [Validators.minLength(0)]),
      municipioNeg: new FormControl(null, Validators.required),
      asentamientoNeg: new FormControl(null, Validators.required),
      asentamientoTypeNeg: new FormControl(null, Validators.required),
      sector: new FormControl(null, Validators.required),
      subsector: new FormControl(null, Validators.required),
      rama: new FormControl(null, Validators.required),
      subrama: new FormControl(null, Validators.required),
      giro: new FormControl(null, Validators.required),
      ref1_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      ref1_name2: new FormControl(null, [Validators.minLength(0)]),
      ref1_paterno: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      ref1_materno: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      // tslint:disable-next-line: max-line-length
      ref1_tel: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      ref1_relacion: new FormControl(null, Validators.required),
      ref2_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      ref2_name2: new FormControl(null, [Validators.minLength(0)]),
      ref2_paterno: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      ref2_materno: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      // tslint:disable-next-line: max-line-length
      ref2_tel: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      ref2_relacion: new FormControl(null, Validators.required),
      monto: new FormControl(),
      plazo: new FormControl(),
      aprivacidad: new FormControl(null, Validators.required)
    },
    {
      validators:
        this.pbaDict(
          'name',
          'a_paterno',
          'name2',
          'a_materno',
          'domicilio',
          'calle',
          'ext',
          'int',
          'municipio',
          'asentamiento',
          'calleNeg',
          'extNeg',
          'intNeg',
          'municipioNeg',
          'asentamientoNeg',
          'ref1_name',
          'ref1_paterno',
          'ref1_name2',
          'ref1_materno',
          'ref2_name',
          'ref2_paterno',
          'ref2_name2',
          'ref2_materno'
        )
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
      fiscal: new FormControl(null, Validators.required),
      autorizobc: new FormControl(false, Validators.required),
      termcond: new FormControl(false, Validators.required)
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
  async searchCP(value, target) {
    if (value.length === 5) {
      await fetch(`https://api-sepomex.hckdrk.mx/query/info_cp/${value}?type=simplified`)
      .then(( response ) => {
        return response.json();
      }).then((json) => {
        console.log(json.response);
        if (target === 'negocio') {
          this.negocio = json.response;
        } else if (target === 'personal') {
          this.personal = json.response;
        }
        setTimeout(() => { M.FormSelect.init(document.querySelectorAll('select')); }, 200);
        return;
      });
    }
  }
  async activitieChange(value, type, sector= null, subsector= null, rama= null, subrama= null) {
    if (type === 'sector' &&  value === undefined) { this.activities = await activitiesService.init(this.activities); }
    if (type === 'sector' &&  value !== undefined) { this.activities = await activitiesService.getSubsector(this.activities, sector); }
    if (type === 'subsector' &&  value !== undefined) { this.activities = await activitiesService.getRama(this.activities, sector, subsector); }
    if (type === 'rama' &&  value !== undefined) { this.activities = await activitiesService.getSubrama(this.activities, sector, subsector, rama); }
    if (type === 'subrama' &&  value !== undefined) { this.activities = await activitiesService.getGiro(this.activities, sector, subsector, rama, subrama); }
    setTimeout(() => { M.FormSelect.init(document.querySelectorAll('select')); }, 200);
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

updateDropDownDepartamentos = function(pais) {
  console.log("change",pais)
  this.departamentos_filter = this.departamentos.filter( {deptoPais: pais} );
}

updateDropDownProvincias = function(depto) {
  this.provincias_filter = this.provincias.filter( { deptoId: depto });
}

}
