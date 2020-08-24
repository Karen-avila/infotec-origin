import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, CurpService, LoanDataService } from '../../services/service.index';
import { PersonalReferences } from '../../models/personal-references.model' ;
import { ListaDocs } from '../../models/lista-docs.model' ;
import { ActivatedRoute } from '@angular/router';
import { Options, LabelType } from 'ng5-slider';
import { Finance } from 'financejs';
import * as M from 'materialize-css';
import swal from 'sweetalert';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-nuevosdocs',
  templateUrl: './nuevosdocs.component.html',
  styleUrls: ['./nuevosdocs.component.css']
})
export class NuevosdocsComponent implements OnInit {
popup;
formDocumentos: FormGroup;
formFiel: FormGroup;
terms = false;
autorizobc = false;
aprivacidad = false;
termcond = false;
listaDocs=new ListaDocs();
typeId = 'ine';
alrt = [
  { name: "Curp", url: "https://www.gob.mx/curp/" },
  { name: "recibo digital de CFE", url: "https://app.cfe.mx/Aplicaciones/CCFE/SolicitudesCFE/Solicitudes/ConsultaTuReciboLuzGmx.aspx " },
  { name: "Constancia de Situación Fiscal", url: "https://www.sat.gob.mx/aplicacion/operacion/53027/genera-tu-constancia-de-situacion-fiscal" },
  { name: "recibo digital de CFE", url: "https://app.cfe.mx/Aplicaciones/CCFE/SolicitudesCFE/Solicitudes/ConsultaTuReciboLuzGmx.aspx" }
];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public loanService: LoanDataService
  ) { }

  ngOnInit() {
    let elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);
  

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
    //buro: new FormControl(null, Validators.required),
    aprivacidad: new FormControl(null, Validators.required)
    
  });

}
get doc() { return this.formDocumentos.controls; }
get fi() { return this.formFiel.controls; }

dfiel() {
  // ////console.log('formFiel is valid?', this.formFiel.valid);
  if (this.formFiel.valid) {
    // ////console.log('formFiel', this.formFiel.value);
    this.router.navigate(["home"]);
    // enviar datos a back
    this.popup[0].open();
  } else {
    swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
  }
}

ValidateSize(file) {
  // // ////console.log("onchanges")
  const fl = (document.getElementById(file) as HTMLInputElement);
  const FileSize = fl.files[0].size / 1024 / 1024; // in MB
  if (!this.userService.validateFileExtension(fl.files[0].name)) {
    swal('¡Cuidado!', 'Tu archivo no es del tipo válido', 'warning');
    fl.value = null;
    return;
  }

  if (FileSize > 2) {
    swal('¡Cuidado!', 'Tu archivo debe ser menor a 2Mb', 'warning');
    fl.value = null;
  }
}

typeIdFun() {
  //console.log("cambiando..");
  /*if (this.typeId === 'pasaporte') {
    this.typeId = 'ine'
    // ////console.log("cambiooo..",this.typeId);
  } else {
    this.typeId = 'pasaporte'
    // ////console.log("cambiooo..",this.typeId);
  } */
  if (this.typeId) {
    this.formDocumentos.get('reverso').setValue('N/A');
  }
}


ddocumentos() {
  console.log("documents",this.formDocumentos.value)
  //this.popup[9].open(); //revisar donde cierra
  let documents = ['frontal', 'reverso', 'comprobante', 'comprobanten', 'estado', 'declaracion', 'curpd', 'fiscal'];
  if (this.formDocumentos.valid) {
    
  //if (1) {
    // Loop

    for (let i = 0; i < documents.length; i++) {

      this.userService.sendDocuments(documents[i], (<HTMLInputElement>document.getElementById(documents[i])).files[0])
        .subscribe(res => {
        //console.log("esto responde el servicio documents", res); //revisar res.user p.ej y hacer un if(uid){openmodal}
          //swal("¡Documentos Guardados!", "Continuar", "success");
        });
      swal("¡Documentos Guardados!", "Continuar", "success");
      //this.stepper.openStep(4);
      this.router.navigate(["home"]);
      //this.popup[9].close();
    }

  } else {
    //this.popup[9].close(); 
    //this.findInvalidControls();
    //this.router.navigate(["login"]);
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

sweetDoc(id) {

  swal({
    title: 'Importante',
    // tslint:disable-next-line: max-line-length
    text: 'Descarga tu ' + this.alrt[id].name + ' en la dirección ' + this.alrt[id].url + ' o puede acceder dando click en el boton de abajo',
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
    text: 'Si eres PERSONA FÍSICA CON ACTIVIDAD EMPRESARIAL envía tu última DECLARACIÓN DEL EJERCICIO DE IMPUESTOS FEDERALES; si eres PERSONA FÍSICA EN EL RÉGIMEN DE INCORPORACIÓN FISCAL envía el último ',
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

}