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

// Pick Address
import { MouseEvent } from '@agm/core';
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
declare var google;
// End PickAdress

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sector;
  subsector;
  rama;
  subrama;
  giro;
  aviso;
  bc;
  term;

  asentamiento;
  asentamientoneg;

  optionsplaces: any = {
    types: ['geocode', 'establishment'],
    componentRestrictions: { country: 'MX' }
  };
  // Pick Address
  // google maps zoom level
  zoom: number = 16;
  // initial center position for the map
  lat: number = 19.4310842;
  lng: number = -99.1387687;
  markers: Marker[] = [];

  // google maps zoom level
  zoom2: number = 16;
  // initial center position for the map
  lat2: number = 19.4310842;
  lng2: number = -99.1387687;
  markers2: Marker[] = [];
  // End PickAdress

  typeId = 'ine';
  dummyAmmount = 40000;

  activities = {
    sectorList: [],
    subsectorList: [],
    ramaList: [],
    subramaList: [],
    giroList: []
  };
  infoPersonal = {
    calle: '',
    latitude: 0,
    longitude: 0,
  };
  personal = {
    calle: '',
    int: '',
    ext: '',
    cp: '',
    estado: '',
    tipo_asentamiento: '',
    colonia: '',
    municipio: '',
    asentamiento: [],
    latitude: 0,
    longitude: 0,
  };
  negocio = {
    calle: '',
    int: '',
    ext: '',
    cp: '',
    estado: '',
    tipo_asentamiento: '',
    colonia: '',
    municipio: '',
    asentamiento: [],
    latitude: 0,
    longitude: 0,
  };
  questionForm = {};
  monte;
  hugo = '666';
  stepper;
  model = 'pFisica';
  modal = 'falso';
  popup;
  calendar;
  terms = false;
  autorizobc = false;
  aprivacidad = false;
  termcond = false;
  form: FormGroup;
  formDocumentos: FormGroup;
  formFiel: FormGroup;
  formFielFirm: FormGroup;
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
    { name: "Curp", url: "https://www.gob.mx/curp/" },
    { name: "recibo digital de CFE", url: "https://app.cfe.mx/Aplicaciones/CCFE/SolicitudesCFE/Solicitudes/ConsultaTuReciboLuzGmx.aspx " },
    { name: "Constancia de Situación Fiscal", url: "https://www.sat.gob.mx/aplicacion/operacion/53027/genera-tu-constancia-de-situacion-fiscal" },
    { name: "recibo digital de CFE", url: "https://app.cfe.mx/Aplicaciones/CCFE/SolicitudesCFE/Solicitudes/ConsultaTuReciboLuzGmx.aspx" }
  ];
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
          return '<b>Si te Prestamos: </b>MX' + this.monte;
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
    /* this.re=5; */

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
          // console.log(msg.data);
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
    // // console.log("PAGO MENSUAL ", pmt.toFixed(2));
    const pagos = [];
    pagos.push(montoCapital);
    for (let i = 0; i < plazoCredito; i++) {
      pagos.push(pmt);
    }
    const tirMensual = this.finance.IRR.apply(this, pagos);
    // // console.log("TIR MENSUAL " +tirMensual.toFixed(2) +"%");
    const tirAnual = tirMensual * 12;
    // // console.log("TIR ANUAL "+ tirAnual.toFixed(2)+"%");
    const cat = (Math.pow((1 + (tirMensual / 100)), 12)) - 1;
    // // console.log("CAT "+cat.toFixed(2)+"%");
    this.catPorcentaje = ((Math.pow((1 + (tirMensual / 100)), 12)) - 1) * 100;
    // // console.log("CAT "+ this.catPorcentaje.toFixed(2)+"%");
  }

  ngOnInit() {
    //// console.log("comienza ngOnInit",this.alrt);
    let elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);

    let select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    let stepperDiv = document.getElementById('api_nav_demo');
    //// console.log(stepperDiv);
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
      latdomic: new FormControl(null, Validators.required),
      lngdomic: new FormControl(null, Validators.required),
      latneg: new FormControl(null, Validators.required),
      lngneg: new FormControl(null, Validators.required),
      paso: new FormControl("3", Validators.required),
      clientid: new FormControl(localStorage.getItem('clientid'), Validators.required),
      tipopersona: new FormControl(null, Validators.required),
      clabeinter: new FormControl(null, [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('[0-9]{18}')]),
      nombre: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      nombre2: new FormControl(null, [Validators.minLength(0)]),
      apaterno: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      amaterno: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      fechanac: new FormControl(null, Validators.required),
      edocivil: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      telpersonal: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      paisnaci: new FormControl("Mexico", Validators.required),
      entidadfednaci: new FormControl(null, Validators.required),
      claveelector: new FormControl(null, Validators.required),
      curp: new FormControl(null, Validators.required),
      rfc: new FormControl(null, Validators.required),
      calle: new FormControl(null, Validators.required),
      numextdomic: new FormControl(null, Validators.required),
      numint: new FormControl(null, [Validators.minLength(0)]),
      cp: new FormControl(null, Validators.required),
      entidadfeddomic: new FormControl(null, Validators.required),
      municipio: new FormControl(null, Validators.required),
      tipoasentamiento: new FormControl(null, Validators.required),
      asentamiento: new FormControl(null, Validators.required),
      /* domicilio: new FormControl(' '), */  /* Se quita al remover map openStreet */
      calleneg: new FormControl(null, Validators.required),
      numextneg: new FormControl(null, Validators.required),
      numintneg: new FormControl(null, [Validators.minLength(0)]),
      cpneg: new FormControl(null, Validators.required),
      entidadfedneg: new FormControl(null, Validators.required),
      municipioneg: new FormControl(null, Validators.required),
      asentamientoneg: new FormControl(null, Validators.required),
      tipoasentamientoneg: new FormControl(null, Validators.required),
      sector: new FormControl(null, Validators.required),
      subsector: new FormControl(null, Validators.required),
      rama: new FormControl(null, Validators.required),
      subrama: new FormControl(null, Validators.required),
      giro: new FormControl(null, Validators.required),
      ref1nombre: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      ref1nombre2: new FormControl(null, [Validators.minLength(0)]),
      ref1apaterno: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      ref1amaterno: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      ref1tel: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      ref1tiporelacion: new FormControl(null, Validators.required),
      ref2nombre: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      ref2nombre2: new FormControl(null, [Validators.minLength(0)]),
      ref2apaterno: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      ref2amaterno: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      ref2tel: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      ref2tiporelacion: new FormControl(null, Validators.required),
      montocredito: new FormControl(),
      plazocredito: new FormControl(),
      aprivacidad: new FormControl(null, Validators.required)
    },
      {
        validators:
          this.pbaDict(
            'nombre',
            'apaterno',
            'nombre2',
            'amaterno',
            /* 'domicilio', */
            /*       'calle',
                  'ext',
                  'int',
                  'municipio',
                  'asentamiento',
                  'calleneg',
                  'extNeg',
                  'intNeg',
                  'municipioneg',
                  'asentamientoneg',
                  'ref1_name',
                  'ref1_paterno', GMVLMR80070601M100
                  'ref1_name2',
                  'ref1_materno',
                  'ref2_name',
                  'ref2_paterno',
                  'ref2_name2',
                  'ref2_materno' */
          )
      });
    this.formDocumentos = new FormGroup({
      paso: new FormControl("4", Validators.required),
      clientid: new FormControl(localStorage.getItem('clientid'), Validators.required),
      typeId: new FormControl(null, Validators.required),
      frontal: new FormControl(null, Validators.required),
      reverso: new FormControl(null, Validators.required),
      comprobante: new FormControl(null, Validators.required),
      comprobanten: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
      declaracion: new FormControl(null, Validators.required),
      curpd: new FormControl(null, Validators.required),
      fiscal: new FormControl(null, Validators.required),
      autorizobc: new FormControl(false, Validators.required),
      termcond: new FormControl(false, Validators.required),
      //fiel: new FormControl(null, Validators.required),
      //cer: new FormControl(null, Validators.required),
      //password: new FormControl(null, Validators.required)
       buro: new FormControl(null, Validators.required)

    });

    this.formFiel = new FormGroup({
      fiel: new FormControl(null, Validators.required),
      cer: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.formFielFirm = new FormGroup({
      fielFirm: new FormControl(null, Validators.required),
      cerFirm: new FormControl(null, Validators.required),
      passwordFirm: new FormControl(null, Validators.required)
    });
  }

  get f() { return this.form.controls; }
  get doc() { return this.formDocumentos.controls; }
  get fi() { return this.formFiel.controls; }
  get fir() { return this.formFielFirm.controls; }

  pbaDict(
    p1: string,
    p2: string,
    p3: string,
    p4: string,
    /* p5: string, */
    /*     p6: string,
        p7: string,
        p8: string,
        p9: string,
        p10: string,
        p11: string,
        p12: string,
        p13: string,
        p14: string,
        p15: string,
        p16: string,
        p17: string,
        p18: string,
        p19: string,
        p20: string,
        p21: string,
        p22: string,
        p23: string */
  ) {
    return (group: FormGroup) => {
      const val1 = group.controls[p1].value;
      const val2 = group.controls[p2].value;
      const val3 = group.controls[p3].value;
      const val4 = group.controls[p4].value;
      /* const val5 = group.controls[p5].value; */
      /*     const val6 = group.controls[p6].value;
          const val7 = group.controls[p7].value;
          const val8 = group.controls[p8].value;
          const val9 = group.controls[p9].value;
          const val10 = group.controls[p10].value;
          const val11 = group.controls[p11].value;
          const val12 = group.controls[p12].value;
          const val13 = group.controls[p13].value;
          const val14 = group.controls[p14].value;
          const val15 = group.controls[p15].value;
          const val16 = group.controls[p16].value;
          const val17 = group.controls[p17].value;
          const val18 = group.controls[p18].value;
          const val19 = group.controls[p19].value;
          const val20 = group.controls[p20].value;
          const val21 = group.controls[p21].value;
          const val22 = group.controls[p22].value;
          const val23 = group.controls[p23].value; */
      for (const i of this.dic) {
        // // console.log("compare",val1,"vs",i)
        if (
          val1 === i ||
          val2 === i ||
          val3 === i ||
          val4 === i
          /* val5 === i || */
          /*       val6  === i ||
                val7 === i ||
                val8 === i ||
                val9 === i ||
                val10 === i ||
                val11  === i ||
                val12 === i ||
                val13 === i ||
                val4 === i ||
                val15 === i ||
                val16  === i ||
                val17 === i ||
                val18 === i ||
                val9 === i ||
                val20  === i ||
                val21 === i ||
                val22 === i ||
                val23 === i */
        ) {
          return { isMatch: true };
        }
      }
    };
  }

  async searchCP(value, target) {
    if (value.length === 5) {
      await fetch(`https://api-sepomex.hckdrk.mx/query/info_cp/${value}?type=simplified`)
        .then((response) => {
          return response.json();
        }).then((json) => {
          //console.log('codigo error',json.code_error)
          if(json.code_error === 105){
            swal("Lo sentimos!", "Tu código postal no esta dentro de los participantes para este apoyo, revisa constantemente para validar si existen otros apoyos.", "info");
            this.userService.logout();
          }else{
            if (target === 'negocio') {
              this.negocio.tipo_asentamiento = json.response.tipo_asentamiento;
              this.negocio.colonia = json.response.colonia;
              this.negocio.asentamiento = json.response.asentamiento;
              this.negocio.municipio = json.response.municipio;
              this.negocio.estado = json.response.estado;
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.negocio.calle}+${this.negocio.ext}+${this.negocio.asentamiento}+${this.negocio.municipio}+${this.negocio.estado}&key=AIzaSyCseZ0trHuyvuZlNh6TXxz1-6OJhXfXaww&language=es`)
                .then((response) => {
                  return response.json();
                }).then((json) => {
                  if (json.status === 'OK') {
                    this.lat2 = json.results[0].geometry.location.lat;
                    this.lng2 = json.results[0].geometry.location.lng;
                    this.markers2 = [{
                      lat: json.results[0].geometry.location.lat,
                      lng: json.results[0].geometry.location.lng,
                      label: 'A',
                      draggable: false
                    }];
                  }
                });
            } else if (target === 'personal') {
              this.personal.tipo_asentamiento = json.response.tipo_asentamiento;
              this.personal.colonia = json.response.colonia;
              this.personal.asentamiento = json.response.asentamiento;
              this.personal.municipio = json.response.municipio;
              this.personal.estado = json.response.estado;
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.personal.calle}+${this.personal.ext}+${this.personal.asentamiento}+${this.personal.municipio}+${this.personal.estado}&key=AIzaSyCseZ0trHuyvuZlNh6TXxz1-6OJhXfXaww&language=es`)
                .then((response) => {
                  return response.json();
                }).then((json) => {
                  if (json.status === 'OK') {
                    if (target === 'personal') {
                      this.lat = json.results[0].geometry.location.lat;
                      this.lng = json.results[0].geometry.location.lng;
                      this.markers = [{
                        lat: json.results[0].geometry.location.lat,
                        lng: json.results[0].geometry.location.lng,
                        label: 'A',
                        draggable: false
                      }];
                    }
                  }
                });
            }
            setTimeout(() => { M.FormSelect.init(document.querySelectorAll('select')); }, 200);
            return;
          }
       
          
        });
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  async activitieChange(value, type, sector = null, subsector = null, rama = null, subrama = null) {
    if (type === 'sector' && value === undefined) { this.activities = await activitiesService.init(this.activities); }
    if (type === 'sector' && value !== undefined) { this.activities = await activitiesService.getSubsector(this.activities, sector); }
    if (type === 'subsector' && value !== undefined) { this.activities = await activitiesService.getRama(this.activities, sector, subsector); }
    if (type === 'rama' && value !== undefined) { this.activities = await activitiesService.getSubrama(this.activities, sector, subsector, rama); }
    if (type === 'subrama' && value !== undefined) { this.activities = await activitiesService.getGiro(this.activities, sector, subsector, rama, subrama); }
    setTimeout(() => { M.FormSelect.init(document.querySelectorAll('select')); }, 200);
  }

  ValidateSize(file) {
    // // console.log("onchanges")
    const fl = (document.getElementById(file) as HTMLInputElement);
    const FileSize = fl.files[0].size / 1024 / 1024; // in MB
    if (FileSize > 2) {
      // alert('File size exceeds 2 MB');
      swal('¡Cuidado!', 'Tu archivo debe ser menor a 2Mb', 'warning');
      fl.value = null;
    }
  }

  /* toBase64 = file => new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = () => resolve(reader.result);
   reader.onerror = error => reject(error);
}); */
  findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log("Invalid: " + name);
        if (document.getElementById(name) != null) {
          document.getElementById(name).classList.add('invalid');
        } else {
          console.log("Element in null");
        }
      }
    }
    return invalid;
  }

  dpersonales() {
    //console.log(this.form.value);
    if (this.form.valid) {
      this.userService.sendPersonalData(this.form.value)
        .subscribe(res => {
          console.log(res);
          // claveelector
          // CURP 
          var curp = <HTMLInputElement>document.getElementById('curp');
          var identification = <HTMLInputElement>document.getElementById('claveelector');
          var payload = { // INE 1, CURP 2
            documentTypeId: 1, 
            status: "Active",
            documentKey: identification.value,
            description: "Clave Elector"            
          };
          var payload2 = { // INE 1, CURP 2
            documentTypeId: 2, 
            status: "Active",
            documentKey: curp.value,
            description: "Curp"            
          }
          this.userService.sendIdentification(payload).subscribe(res => {
            console.log("sube clave elector",res);
          }); 
          this.userService.sendIdentification(payload2).subscribe(res => {
            console.log("sube curp",res);
          }); 
        });
      this.stepper.openStep(3);
    } else {
      this.findInvalidControls();
      swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
    }
  }

  dfiel() {
    // console.log('formFiel is valid?', this.formFiel.valid);
    if (this.formFiel.valid) {
      // console.log('formFiel', this.formFiel.value);
      this.router.navigate(["home"]);
      // enviar datos a back
      this.popup[0].open();
    } else {
      swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
    }
  }

  dfielFirm() {
    // console.log('formFiel is valid?', this.formFielFirm.valid);
    if (this.formFielFirm.valid) {
      // console.log('formFiel', this.formFielFirm.value);
      this.router.navigate(["home"]);
      // enviar datos a back
      this.popup[0].open();
    } else {
      swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
    }
  }

  ddocumentos() {
    let documents = ['frontal','reverso','comprobante','comprobanten','estado','declaarcion','curpd','fiscal'];
    // if (this.formDocumentos.valid) {
    if (1) {
      // Loop
      console.log("for",documents.length)
      for(let i=0;i<documents.length;i++){
        console.log("for")
        this.userService.sendDocuments(documents[i], (<HTMLInputElement>document.getElementById(documents[i])).files[0])
        .subscribe(res => {
          console.log("esto responde el servicio documents", res); //revisar res.user p.ej y hacer un if(uid){openmodal}
          //swal("¡Documentos Guardados!", "Continuar", "success");
        });
        swal("¡Documentos Guardados!", "Continuar", "success");
        this.stepper.openStep(4);
      }
     /*  const file = (<HTMLInputElement>document.getElementById('frontal')).files[0];
      this.userService.sendDocuments('identificacion', file)
        .subscribe(res => {
          console.log("esto responde el servicio documents", res); //revisar res.user p.ej y hacer un if(uid){openmodal}
          //swal("¡Documentos Guardados!", "Continuar", "success");
        }); */
      // End Loop
      // Esperar a que terminen
      
    } else {
      this.findInvalidControls();
      swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
    }
  }

  sweetHome(id) {
    /* swal('Importante',
    'Para obtener su CURP debera obtenerlo de https://www.gob.mx/curp/, puede acceder dando click en el boton de abajo',
    'info',
    {buttons: ["Cancelar", "Consultar Curp"]},)
    ;*/
    swal({
      title: 'Importante',
      // tslint:disable-next-line: max-line-length
      text: 'Para obtener su ' + this.alrt[id].name + ' debera obtenerlo de ' + this.alrt[id].url + ' puede acceder dando click en el boton de abajo',
      icon: 'info',
      buttons: {
        d: {
          text: 'Cancelar',
          value: false,
          visible: true,
          className: '',
          closeModal: true,
        },
        j: {
          text: 'Consultar ' + this.alrt[id].name,
          value: true,
          visible: true,
          className: 'red darken-4',
          closeModal: true,
        }
      }
    }).then((value) => {
      if (value) {
        window.open(this.alrt[id].url, '_blank');
      }
    });
  }
  viewMap() {
    // // console.log("map")
    document.getElementById('steps').classList.add('hide');
    document.getElementById('modalMap').classList.remove('hide');
    // this.router.navigate(["map"]);
  }
  mapOk() {
    // // console.log("map")
    document.getElementById('steps').classList.remove('hide');
    document.getElementById('modalMap').classList.add('hide');
    // this.router.navigate(["map"]);
  }
  rFiscal() {
    // // console.log("Reviso valor de check", this.model);
    if (this.model) {
      this.form.get('pFisica').setValue(' ');
    }
  }

  rechazar() {
    // console.log("Rechazado");

  }

  typeIdFun() {
    /* // console.log("cambiando..");
    if (this.typeId === 'pasaporte') {
      this.typeId = 'ine'
      // console.log("cambiooo..",this.typeId);
    } else {
      this.typeId = 'pasaporte'
      // console.log("cambiooo..",this.typeId);
    } */
    if (this.typeId) {
      this.formDocumentos.get('reverso').setValue('N/A');
    }
  }

  // Pick Address
  handleAddressChange(event, target, centerMap = true) {
    event.address_components.map((item) => {
      if (target === 'personal') {
        this.personal.latitude = event.geometry.location.lat();
        this.personal.longitude = event.geometry.location.lng();
        // this.searchCP(this.personal.cp, 'personal');
      }
      if (target === 'negocio') {
        this.negocio.latitude = event.geometry.location.lat();
        this.negocio.longitude = event.geometry.location.lng();
        // this.searchCP(this.negocio.cp, 'negocio');
      }
      if (centerMap) {
        if (target === 'personal') {
          this.lat = event.geometry.location.lat();
          this.lng = event.geometry.location.lng();
          this.markers = [
            {
              lat: event.geometry.location.lat(),
              lng: event.geometry.location.lng(),
              label: 'CASA',
              draggable: true
            },
          ];
        }
        if (target === 'negocio') {
          this.lat2 = event.geometry.location.lat();
          this.lng2 = event.geometry.location.lng();
          this.markers2 = [
            {
              lat: event.geometry.location.lat(),
              lng: event.geometry.location.lng(),
              label: 'NEGOCIO',
              draggable: true
            },
          ];
        }
      }

    });
  }
  mapClicked($event: MouseEvent, target) {
    if (target === 'personal') {
      this.markers = [{
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'CASA',
        draggable: false
      }];
    }
    if (target === 'negocio') {
      this.markers2 = [{
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'NEGOCIO',
        draggable: false
      }];
    }
    new google.maps.Geocoder().geocode({
      latLng: new google.maps.LatLng($event.coords.lat, $event.coords.lng)
    }, (results, status) => {
      this.handleAddressChange(results[1], target, false);
    });
  }
  // end Pick Address

  aceptaCred() {
    document.getElementById('nano').classList.remove('hide');
    document.getElementById('nanoo').classList.add('hide');
  }

  cancelaCred() {
    document.getElementById('nano').classList.add('hide');
    document.getElementById('nanoo').classList.remove('hide');
  }

  rechazaCred() {

  }

}
