import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, CurpService, LoanDataService } from '../../services/service.index';
import { PersonalReferences } from '../../models/personal-references.model' ;
import { ListaDocs } from '../../models/lista-docs.model' ;
import { ActivatedRoute } from '@angular/router';
import { Finance } from 'financejs';
import * as M from 'materialize-css';
import swal from 'sweetalert';
import activitiesService from './service/activities.service';
import { EventManager } from '@angular/platform-browser';

import { StorageService } from '../../services/storage/storage.service'

import * as _ from 'underscore';

declare const MStepper: any;

// Pick Address
import { MouseEvent } from '@agm/core';
import { Sign } from 'src/app/models/sign.model';

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

  valuePlaz='';
  valueMon='';
  catPorcentaje='';
  listaDocs=new ListaDocs();

  entidadNac;
  pagare;

  viewError: Array<string> = [];
  sector;
  subsector;
  rama;
  subrama;
  giro;
  aviso;
  bc;
  term;
  bankInter1: String;
  bankInter2: String;

  asentamiento;
  asentamientoneg;
  email;

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
  stateOptions = [];
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
  loanData;
  dic = [
    "apa??ar",
    "cagar",
    "cojo",
    "chingada",
    "APA??AR",
    "ARRABALERA",
    "ASESINAR",
    "ASESINO",
    "ASSHOLE",
  ]
  alrt = [
    { name: "Curp", url: "https://www.gob.mx/curp/" },
    { name: "recibo digital de CFE", url: "https://app.cfe.mx/Aplicaciones/CCFE/SolicitudesCFE/Solicitudes/ConsultaTuReciboLuzGmx.aspx " },
    { name: "Constancia de Situaci??n Fiscal", url: "https://www.sat.gob.mx/aplicacion/operacion/53027/genera-tu-constancia-de-situacion-fiscal" },
    { name: "recibo digital de CFE", url: "https://app.cfe.mx/Aplicaciones/CCFE/SolicitudesCFE/Solicitudes/ConsultaTuReciboLuzGmx.aspx" }
  ];
  re;
  //-------------------

  finance = new Finance();
  // -------------------
  constructor(
    public storageService:StorageService,
    public loanService: LoanDataService,
    public userService: UserService,
    private curpService: CurpService,
    private route: ActivatedRoute,
    private router: Router,
    private eventManager: EventManager
  ) {
    /*  */
    this.loanService.getLoanData(); //Esto ira en login cuando reciba loanid
    this.loanService. getPersonalData(); //Esto ira en login cuando reciba loanid
    this.loanService. getAddressData(); //Esto ira en login cuando reciba loanid
    /*  */
    //this.re = localStorage.getItem('step');
    this.re = this.storageService.getJsonValue('stepper')
    //this.re=4;
    this.loanService.nombre.subscribe((value) => {
      this.loanData = value; 
  });

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
          // ////console.log(msg.data);
        }
      }
    );

   
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.email=params.email);
    //// ////console.log("comienza ngOnInit",this.alrt);
    let elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);

    let select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    let stepperDiv = document.getElementById('api_nav_demo');
    //// ////console.log(stepperDiv);
    this.stepper = new MStepper(stepperDiv, {
      // Default active step.
      firstActive: this.re.step, //api regresa paso a activar siempre debe empezar minimo en 1
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
      email: new FormControl(this.email),
      latdomic: new FormControl(null, Validators.required),
      lngdomic: new FormControl(null, Validators.required),
      phoneneg: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      latneg: new FormControl(null, Validators.required),
      lngneg: new FormControl(null, Validators.required),
      paso: new FormControl("3", Validators.required),
      clientid: new FormControl(localStorage.getItem('clientid'), Validators.required),
      base64EncodedAuthenticationKey: new FormControl(localStorage.getItem('authkey'), Validators.required),
      tipopersona: new FormControl(null, Validators.required),
      clabeinter: new FormControl(null, [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('[0-9]{18}')]),
      clabeinterconf: new FormControl(null, [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('[0-9]{18}')]),
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
      catPorcentaje: new FormControl(),
      termcond: new FormControl(false, Validators.required),
      aprivacidad: new FormControl(null, Validators.required)
    }, { validators: this.compareClabe('clabeinter', 'clabeinterconf'), }
    /* ,
      {
        validators:
          this.pbaDict(
            'nombre',
            'apaterno',
            'nombre2',
            'amaterno',
            'domicilio',
                  'calle',
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
                  'ref2_materno'
          )
      } */
      );

    this.formDocumentos = new FormGroup({
      paso: new FormControl("4", Validators.required),
      clientid: new FormControl(localStorage.getItem('clientid'), Validators.required),
      typeId: new FormControl("ine", Validators.required),
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
      //buro: new FormControl(null, Validators.required),
      aprivacidad: new FormControl(null, Validators.required)
      
    });

    this.formFiel = new FormGroup({
      fiel: new FormControl(null, Validators.required),
      cer: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.formFielFirm = new FormGroup({
      fielFirm: new FormControl(null, Validators.required),
      cerFirm: new FormControl(null, Validators.required),
      passwordFirm: new FormControl(null, Validators.required),
      termcond: new FormControl(false, Validators.required),
      aprivacidad: new FormControl(null, Validators.required)
    });

    var dataCode = 'STATE';
    this.userService.getDataCode('STATE').subscribe(
      data => {
        this.stateOptions = _.sortBy(data.codeValues, 'name');
        console.log("states",this.stateOptions)
      },
      error => console.error('There was an error getting code values ' + dataCode, error)
    )

  }

  get f() { return this.form.controls; }
  get doc() { return this.formDocumentos.controls; }
  get fi() { return this.formFiel.controls; }
  get fir() { return this.formFielFirm.controls; }

  compareClabe(cbl1: string, cbl2: string){
    return (group: FormGroup) => {
      let clabe1 = group.controls[cbl1].value;
      let clabe2 = group.controls[cbl2].value;
      if (clabe1 === clabe2) {
        return null;
      }
      return { isValid: true };
    }
  }
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
        // // ////console.log("compare",val1,"vs",i)
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

  generateCurp() {
    ////console.log("se llama generar curp");
    var nombre = this.form.get('nombre').value;
    const nombre2 = this.form.get('nombre2').value;
    if (nombre2 !== '') {
      nombre = nombre + " " + nombre2;
    }
    const apaterno = this.form.get('apaterno').value;
    const amaterno = this.form.get('amaterno').value;
    const fechanac = this.form.get('fechanac').value;
    const entidadfednaci = this.form.get('entidadfednaci').value;
    const genero = this.form.get('genero').value;
    var curp = this.curpService.generarCURP(nombre, apaterno, amaterno, fechanac, genero, entidadfednaci);
    if (curp !== '') {
      this.form.get('curp').setValue(curp);
      this.form.get('rfc').setValue(curp.substr(0, 10));
    }
  }

  async searchCP(value, target) {
    if (value.length === 5) {
      await fetch(`https://api-sepomex.hckdrk.mx/query/info_cp/${value}?type=simplified`)
        .then((response) => {
          return response.json();
        }).then((json) => {
          //////console.log('codigo error',json.code_error)
          if (json.code_error === 105) {
            swal("Lo sentimos!", "Tu c??digo postal no esta dentro de los participantes para este apoyo, revisa constantemente para validar si existen otros apoyos.", "info");
            //this.userService.logout();
          } else {
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

  getBankName(option) {
    var clabe = this.form.get('clabeinter').value;
    if (clabe == null) {
      return "";
    }
    if (option === 2) {
      clabe = this.form.get('clabeinterconf').value;
    }
    if (clabe.length > 2) {
      const prefix = clabe.substring(0, 3);
      const banks = [
        { "code": "002", "name": "BANAMEX" },
        { "code": "006", "name": "BANCOMEXT" },
        { "code": "009", "name": "BANOBRAS" },
        { "code": "012", "name": "BBVA BANCOMER" },
        { "code": "014", "name": "SANTANDER" },
        { "code": "019", "name": "BANJERCITO" },
        { "code": "021", "name": "HSBC" },
        { "code": "030", "name": "BAJIO" },
        { "code": "032", "name": "IXE" },
        { "code": "036", "name": "INBURSA" },
        { "code": "037", "name": "INTERACCIONES" },
        { "code": "042", "name": "MIFEL" },
        { "code": "044", "name": "SCOTIABANK" },
        { "code": "058", "name": "BANREGIO" },
        { "code": "059", "name": "INVEX" },
        { "code": "060", "name": "BANSI" },
        { "code": "062", "name": "AFIRME" },
        { "code": "072", "name": "BANORTE" },
        { "code": "102", "name": "THE ROYAL BANK" },
        { "code": "103", "name": "AMERICAN EXPRESS" },
        { "code": "106", "name": "BAMSA" },
        { "code": "108", "name": "TOKYO" },
        { "code": "110", "name": "JP MORGAN" },
        { "code": "112", "name": "BMONEX" },
        { "code": "113", "name": "VE POR MAS" },
        { "code": "116", "name": "ING" },
        { "code": "124", "name": "DEUTSCHE BANK" },
        { "code": "126", "name": "CREDIT SUISSE" },
        { "code": "127", "name": "AZTECA" },
        { "code": "128", "name": "AUTOFIN" },
        { "code": "129", "name": "BARCLAYS" },
        { "code": "130", "name": "COMPARTAMOS" },
        { "code": "131", "name": "BANCO FAMSA" },
        { "code": "132", "name": "BMULTIVA" },
        { "code": "133", "name": "ACTINVER" },
        { "code": "134", "name": "WAL-MART" },
        { "code": "135", "name": "NAFIN" },
        { "code": "136", "name": "INTERBANCO" },
        { "code": "137", "name": "BANCOPPEL" },
        { "code": "138", "name": "ABC CAPITAL" },
        { "code": "139", "name": "UBS BANK" },
        { "code": "140", "name": "CONSUBANCO" },
        { "code": "141", "name": "VOLKSWAGEN" },
        { "code": "143", "name": "CIBANCO" },
        { "code": "145", "name": "BBASE" },
        { "code": "156", "name": "SABADELL" },
        { "code": "166", "name": "BANSEFI" },
        { "code": "168", "name": "HIPOTECARIA FEDERAL" },
        { "code": "600", "name": "MONEXCB" },
        { "code": "601", "name": "GBM" },
        { "code": "602", "name": "MASARI" },
        { "code": "605", "name": "VALUE" },
        { "code": "606", "name": "ESTRUCTURADORES" },
        { "code": "607", "name": "TIBER" },
        { "code": "608", "name": "VECTOR" },
        { "code": "610", "name": "B&B" },
        { "code": "614", "name": "ACCIVAL" },
        { "code": "615", "name": "MERRILL LYNCH" },
        { "code": "616", "name": "FINAMEX" },
        { "code": "617", "name": "VALMEX" },
        { "code": "618", "name": "UNICA" },
        { "code": "619", "name": "MAPFRE" },
        { "code": "620", "name": "PROFUTURO" },
        { "code": "621", "name": "CB ACTINVER" },
        { "code": "622", "name": "OACTIN" },
        { "code": "623", "name": "SKANDIA" },
        { "code": "626", "name": "CBDEUTSCHE" },
        { "code": "627", "name": "ZURICH" },
        { "code": "628", "name": "ZURICHVI" },
        { "code": "629", "name": "SU CASITA" },
        { "code": "630", "name": "CB INTERCAM" },
        { "code": "631", "name": "CI BOLSA" },
        { "code": "632", "name": "BULLTICK CB" },
        { "code": "633", "name": "STERLING" },
        { "code": "634", "name": "FINCOMUN" },
        { "code": "636", "name": "HDI SEGUROS" },
        { "code": "637", "name": "ORDER" },
        { "code": "638", "name": "AKALA" },
        { "code": "640", "name": "CB JPMORGAN" },
        { "code": "642", "name": "REFORMA" },
        { "code": "646", "name": "STP" },
        { "code": "647", "name": "TELECOMM" },
        { "code": "648", "name": "EVERCORE" },
        { "code": "649", "name": "SKANDIA" },
        { "code": "651", "name": "SEGMTY" },
        { "code": "652", "name": "ASEA" },
        { "code": "653", "name": "KUSPIT" },
        { "code": "655", "name": "SOFIEXPRESS" },
        { "code": "656", "name": "UNAGRA" },
        { "code": "659", "name": "OPCIONES EMPRESARIALES DEL NOROESTE" },
        { "code": "670", "name": "LIBERTAD" },
        { "code": "901", "name": "CLS" },
        { "code": "902", "name": "INDEVAL" },
        { "code": "999", "name": "N/A" }
      ];
      for (var i = 0; i < banks.length; i++) {
        if (banks[i].code === String(prefix)) {
          return banks[i].name;
        }
      }
    }
    return "";
  
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
    // // ////console.log("onchanges")
    const fl = (document.getElementById(file) as HTMLInputElement);
    const FileSize = fl.files[0].size / 1024 / 1024; // in MB
    if (!this.userService.validateFileExtension(fl.files[0].name)) {
      swal('??Cuidado!', 'Tu archivo no es del tipo v??lido', 'warning');
      fl.value = null;
      return;
    }

    if (FileSize > 2) {
      swal('??Cuidado!', 'Tu archivo debe ser menor a 2Mb', 'warning');
      fl.value = null;
    }
  }

  validaCurp(){
    if(this.form.get('curp').valid){
      //console.log("valida curp");
      this.userService.validateCurp(this.form.get('curp').value).subscribe(
        data => {
          
          //console.log("validate curp",data)
        },
        error => console.error('error validate curp', error)
      )

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
        var x = document.getElementById(name);
        this.viewError.push(x.getAttribute("name"));
        M.toast({ html: x.getAttribute("name") })
      } else {
        ////console.log("Element in null");
      }
    }
  }
  /* this.popup[0].open(); */
  return this.viewError;
}

  sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }

  dpersonales() {
    this.popup[9].open(); //revisar donde se cierra
    //////console.log(this.form.value);
    /* if (this.form.valid) */
    let message=' ';
    if (this.form.valid) {
      let ref1 = new PersonalReferences(this.form.value.ref1nombre,this.form.value.ref1apaterno + " " + this.form.value.ref1amaterno, 93, 17, 31, 120060, "31 octubre 1991", "es-mx", "dd MMM yyyy", "551212121212", this.form.value.ref1nombre2);
      let ref2 = new PersonalReferences(this.form.value.ref2nombre,this.form.value.ref2apaterno + " " + this.form.value.ref2amaterno, 93, 17, 31, 120060, "31 octubre 1991", "es-mx", "dd MMM yyyy", "51212121212", this.form.value.ref2nombre2);

      this.userService.sendPersonalData(this.form.value)
        .subscribe(res => {
          // claveelector
          // CURP 
          /* var curp = <HTMLInputElement>document.getElementById('curp'); */
          var identification = <HTMLInputElement>document.getElementById('claveelector');
          var payload = { // INE 1, CURP 2
            documentTypeId: 1,
            status: "Active",
            documentKey: identification.value,
            description: "Clave Elector"
          };
          /* var payload2 = { // INE 1, CURP 2
            documentTypeId: 2,
            status: "Active",
            documentKey: curp.value,
            description: "Curp"
          } */
          this.userService.sendIdentification(payload).subscribe(res => {
            ////console.log("sube clave elector", res);
          });
          /* this.userService.sendIdentification(payload2).subscribe(res => {
            ////console.log("sube curp",res);
          }); */

          //send references
          this.userService.sendPersonalReferences(ref1).subscribe(res => {
            ////console.log("manda referencias1",res);
          });
          this.userService.sendPersonalReferences(ref2).subscribe(res => {
            ////console.log("manda referencias2",res);
          });

        });
      
      this.popup[9].close();
      this.stepper.openStep(3);
    } else {  
      this.popup[9].close();    
      let err=this.findInvalidControls();
      message = ' ';
      for(let i=0;i<err.length;i++){
        message = message + err[i]+', ';
      }
      /* swal('??Cuidado!',`Para poder continuar, completa correctamente todos los campos:\n ${message}`, 'error').then((val) => {
        if(val){
        console.log("boton aceptar swal");
        message = ' ';
        }
      }); */
      swal('??Cuidado!',`Para poder continuar, completa correctamente todos los campos:\n ${message}`, 'error')
.then(() => {
  this.viewError = [];
});
      
     }
     
  }


  dfiel() {
    // ////console.log('formFiel is valid?', this.formFiel.valid);
    if (this.formFiel.valid) {
      // ////console.log('formFiel', this.formFiel.value);
      this.router.navigate(["home"]);
      // enviar datos a back
      this.popup[0].open();
    } else {
      swal('??Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
    }
  }

  dfielFirm() {
    this.popup[9].open();
    const docs = new Sign(this.pagare,'amortizacion');
    if (this.formFielFirm.valid) {
      //console.log("fiel form",this.formFielFirm.value)
      /* this.userService.sendContract(docs).subscribe(res => {
        
      }); */
      document.getElementById('sign').classList.add('hide');
      document.getElementById('view-docs').classList.remove('hide');
      /*  */
      /* this.router.navigate(["home"]); */
      /* this.popup[0].open(); */
      this.popup[9].close();
    } else {
      swal('??Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
    }
  }

  recibePagare(mensaje) {
    /* //console.log("el pagare en png B64",mensaje); */
    this.pagare = mensaje;
  }

  ddocumentos() {
    console.log("documents",this.formDocumentos.value)
    this.popup[9].open(); //revisar donde cierra
    let documents = ['frontal', 'reverso', 'comprobante', 'comprobanten', 'estado', 'declaracion', 'curpd', 'fiscal'];
    if (this.formDocumentos.valid) {
      
    //if (1) {
      // Loop

      for (let i = 0; i < documents.length; i++) {

        this.userService.sendDocuments(documents[i], (<HTMLInputElement>document.getElementById(documents[i])).files[0])
          .subscribe(res => {
            ////console.log("esto responde el servicio documents", res); //revisar res.user p.ej y hacer un if(uid){openmodal}
            //swal("??Documentos Guardados!", "Continuar", "success");
          });
        swal("??Documentos Guardados!", "Continuar", "success");
        this.stepper.openStep(4);
        this.popup[9].close();
      }

    } else {
      this.popup[9].close(); 
      this.findInvalidControls();
      swal('??Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
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

  sweetDoc(id) {
  
    swal({
      title: 'Importante',
      // tslint:disable-next-line: max-line-length
      text: 'Descarga tu ' + this.alrt[id].name + ' en la direcci??n ' + this.alrt[id].url + ' o puede acceder dando click en el boton de abajo',
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

  sweetHelp() {
  
    swal({
      title: 'Ayuda',
      // tslint:disable-next-line: max-line-length
      text: 'Si eres PERSONA F??SICA CON ACTIVIDAD EMPRESARIAL env??a tu ??ltima DECLARACI??N DEL EJERCICIO DE IMPUESTOS FEDERALES; si eres PERSONA F??SICA EN EL R??GIMEN DE INCORPORACI??N FISCAL env??a el ??ltimo ',
      icon: 'info',
      buttons: {
        d: {
          text: 'Aceptar',
          value: false,
          visible: true,
          className: '',
          closeModal: true,
        }
      }
    });
    
  }

  viewMap() {
    // // ////console.log("map")
    document.getElementById('steps').classList.add('hide');
    document.getElementById('modalMap').classList.remove('hide');
    // this.router.navigate(["map"]);
  }
  mapOk() {
    // // ////console.log("map")
    document.getElementById('steps').classList.remove('hide');
    document.getElementById('modalMap').classList.add('hide');
    // this.router.navigate(["map"]);
  }
  rFiscal() {
    // // ////console.log("Reviso valor de check", this.model);
    if (this.model) {
      this.form.get('pFisica').setValue(' ');
    }
  }

  rechazar() {
    // ////console.log("Rechazado");

  }

  typeIdFun() {
    /* // ////console.log("cambiando..");
    if (this.typeId === 'pasaporte') {
      this.typeId = 'ine'
      // ////console.log("cambiooo..",this.typeId);
    } else {
      this.typeId = 'pasaporte'
      // ////console.log("cambiooo..",this.typeId);
    } */
    if (this.typeId) {
      
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
    document.getElementById('approval').classList.add('hide');
    document.getElementById('approval2').classList.remove('hide');
  }

  cancelaCred() {
    document.getElementById('approval2').classList.add('hide');
    document.getElementById('approval').classList.remove('hide');
    document.getElementById('view-docs').classList.add('hide');
    document.getElementById('sign').classList.remove('hide');
  }

  rechazaCred() {
/*     swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.router.navigate(["home"]);
      } else {
        
      }
    }); */

    /*  */
    swal({
      title: 'Cuidado',
      // tslint:disable-next-line: max-line-length
      text: 'Al rechazar tu cr??dito deberas volver a completar todo el proceso.',
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
          text: 'Aceptar',
          value: true,
          visible: true,
          className: 'red darken-4',
          closeModal: true,
        }
      }
    }).then((value) => {
      if (value) {
        this.userService.logout();
        this.router.navigate(["home"]);
      }
    });
    
  }

  sendSign(){
    
    const flcer = (<HTMLInputElement>document.getElementById("cerFirm")).files[0]
    const flkey = (<HTMLInputElement>document.getElementById("fielFirm")).files[0]
     
    //console.log("entre a firma")
    let payload = {
      cartcontrato : document.getElementById("PDFamortizacion").innerText,
      tabamortizacion: document.getElementById("PDFamortizacion").innerText,
      pagare: document.getElementById("PDFamortizacion").innerText,
      avprivintegral: document.getElementById("PDFamortizacion").innerText,
      autcirccred: document.getElementById("PDFamortizacion").innerText,
      solcontratacion: document.getElementById("PDFamortizacion").innerText,
      contradhecion: document.getElementById("PDFamortizacion").innerText,
      cer: flcer,
      key: flkey,
      passwordfirm: this.formFielFirm.value.passwordFirm
      /* ,
      base64EncodedAuthenticationKey: localStorage.getItem('authkey'),
      clientid: localStorage.getItem('clientid'), */
    };


/*     this.userService.sendContract(payload).subscribe(res=>{

    },err=>{

    }); */

    this.loanService.sendContract(payload).subscribe(res=>{
      console.log("envias a firmar",res)
     },err=>{
       
     });
    
    

  }

  montPlaz(mensaje) {
    console.log(mensaje);
    this.valuePlaz = mensaje.valuePlaz;
    this.valueMon = mensaje.valueMon;
    this.catPorcentaje = mensaje.catPorcentaje;
  }


}


