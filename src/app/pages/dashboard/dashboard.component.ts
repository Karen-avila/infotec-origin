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

  //********************* */
  sec1=[
    {
      quest:"Antigüedad de negocio.",
      opts:["Menos de 12 meses","De 1 a 2 años","De 3 a 5 años","De 6 a 10 años","Más de 10 años"],
      resp:"",
      value:""
    },
    {
      quest:"Tipo de negocio.",
      opts:["Ventas al menudeo","Manufactura","Ventas al mayoreo","Servicios","Agropecuario"],
      resp:"",
      value:""
    },
    {
      quest:"¿Principalmente a qué plazo se pagan las compras?",
      opts:["Se paga por adelantado","Se paga al momento","Se paga en menos de 7 días","Se paga de 7 a 14 días","Se paga de 15 a 30 días","Se paga antes de 30 días"],
      resp:"",
      value:""
    },
    {
      quest:"¿Principalmente a qué plazo se cobran las ventas?",
      opts:["Se cobran en más de 60 días","Se cobran de 31 a 60 días","Se cobra de 15 a 30 días","Se cobra de 8 a 14 días","Se cobra de 7 días o menos", "Se cobra al momento"],
      resp:"",
      value:""
    },
    {
      quest:"¿Normalmente cómo se compone el inventario del negocio?",
      opts:["Menos del 25% del inventario corresponde a materias primas","Entre 25% y 50% del inventario corresponde a materias primas","Entre 51% y 75% del inventario corresponde a materias primas","Más de 75% del inventario corresponde a materias primas"],
      resp:"",
      value:""
    },
    {
      quest:"¿Desde hace cuánto tiempo el negocio es formal?",
      opts:["Menos de 12 meses","De 1 a 2 años","De 3 a 5 años","De 6 a 10 años","Más de 10 años"],
      resp:"",
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor a los propietarios actuales del negocio.",
      opts:["El negocio tiene un solo propietario","El negocio tiene varios propietarios pero uno toma las decisiones","El negocio tiene varios propietarios y varios toman decisiones"],
      resp:"",
      value:""
    }
  ]

  sec2=[
    {
      quest:"¿El negocio ofrece varios productos o servicios?",
      opts:["Un solo producto o marca","Un solo producto de diferentes marcas","Múltiples productos"],
      resp:"",
      value:""
    },
    {
      quest:"¿El producto o servicio es de temporada o se ofrece en cualquier época del año?",
      opts:["De temporada","En cualquier época del año"],
      resp:"",
      value:""
    },
    {
      quest:"¿Cómo es la fuente principal de suministros del negocio?",
      opts:["El negocio depende de importaciones","El negocio no depende de importaciones"],
      resp:"",
      value:""
    },
    {
      quest:"Número de proveedores.",
      opts:["1 solo proveedor","2 a 5 proveedores","Más de 5 proveedores","No aplica"],
      resp:"",
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor las ventas que se hace a los 5 mejores clientes.",
      opts:["Menos del 25% de las ventas se hace a los 5 principales clientes","Entre el 25% y el 50% de la venta se hace a los principales clientes","Entre el 51% y el 75% de las ventas se hace a los principales clientes","Más del 75% de las ventas se hace a los 5 principales clientes"],
      resp:"",
      value:""
    },
    {
      quest:"¿Los precios de los productos o servicios que ofrece el negocio suben y bajan durante el año?",
      opts:["Suben y bajan moderadamente","Suben y bajan mucho"],
      resp:"",
      value:""
    },
    {
      quest:"¿Cuántos competidores tiene el negocio?",
      opts:["Producto o servicio único","Menos de 10 competidores","De 10 hasta 50 competidores","Más de 50 competidores"],
      resp:"",
      value:""
    },
    {
      quest:"¿Qué tan probable es que el producto o servicio que se ofrece se reemplace o quede obsoleto durante los próximos 2 años?",
      opts:["Poco","Más o menos","Mucho"],
      resp:"",
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor el sector o mercado que atiende el negocio.",
      opts:["El sector o mercado ya pasó por su mejor momento y ahora está disminuyendo","El sector o mercado está en su mejor momento pero ya no crederá","El sector o mercado está en crecimiento"],
      resp:"",
      value:""
    },
    {
      quest:"¿Normalmente el negocio depende de apoyos del gobierno o permisos especiales de éste?",
      opts:["Si","No"],
      resp:"",
      value:""
    },
    {
      quest:"¿Considera que la regulación limita el negocio?",
      opts:["Si","No","Las actividades del negocio no necesitan regularse o controlarse"],
      resp:"",
      value:""
    }
  ]

  sec3=[
    {
      quest:"¿Cómo es la reputación del negocio con los clientes?",
      opts:["No favorable","Aceptable","Favorable"],
      resp:"",
      value:""
    },
    {
      quest:"¿Cómo es la reputación del negocio con los proveedores?",
      opts:["No favorable","Aceptable","Favorable"],
      resp:"",
      value:""
    },
    {
      quest:"¿Hacé cuánto tiempo tienen los dueños del negocio cuentas bancarias?",
      opts:["Menos de 12 meses","De 1 a 2 años","De 3 a 5 años","De 6 a 10 años","Más de 10 años"],
      resp:"",
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor la relación de los dueños con los bancos.",
      opts:["Los dueños tienen o han tenido problemas mayores con los bancos","Los dueños son nuevos clientes y adquirieron un crédito por primera vez","Los dueños ya eran clientes del banco pero apenas adquirieron un crédito por primera vez","Los dueños tienen o han tenido problemas menores con los bancos"],
      resp:"",
      value:""
    },
    {
      quest:"¿Cómo calificaría el historial de crédito de los dueños con los bancos?",
      opts:["Los dueños tienen un mal historial crediticio con los bancos","Los dueños tienen un buen historial crediticio con los bancos","Los dueños no tienen historial crediticio con los bancos"],
      resp:"",
      value:""
    },
    {
      quest:"¿Los dueños tienen juicios en contra o asuntos legales por resolver?",
      opts:["Si","No"],
      resp:"",
      value:""
    }
  ]

  sec4=[
    {
      quest:"¿Cuántos años de experiencia en el negocio tienen los dueños del negocio?",
      opts:["Menos de 1 año","1 a 5 años","6 a 10 años","Más de 10 años"],
      resp:"",
      value:""
    },
    {
      quest:"¿Cuál es la escolaridad de la persona que dirige el negocio?",
      opts:["Ninguna","Primaria incompleta","Primaria completa","Secundaria incompleta","Secundaria completa","Preparatoria o Bachillerato incompleto","Preparatoria o Bachillerato completo","Técnica o comercial incompleta","Técnica o comercial completa","Licenciatura incompleta","Licenciatura completa","Posgrado"],
      resp:"",
      value:""
    },
    {
      quest:"¿Cuál es el rango de edad de la persona que dirige el negocio?",
      opts:["Menos de 25 años","25 a 34 años","35 a 55 años","56 a 65 años","Más de 65 años"],
      resp:"",
      value:""
    },
    {
      quest:"¿El negocio tiene un plan de sucesión para que otra persona se encargue de la dirección en caso de ser necesario? ",
      opts:["No se ha pensado que alguien más se ocupe de la dirección del negocio","La dirección la tomará un familiar pero no conoce el negocio","La dirección la tomará un familiar que ya conoce el negocio","La dirección la tomará alguien profesional auqnue no sea de la familia"],
      resp:"",
      value:""
    }
  ]
  //********************* */
  
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
         return '<b>Si te Prestamos: </b>MX' +  value.toLocaleString('es-MX', {
           style: 'currency',
           currency: 'MXN',
         }); 
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
  constructor(public userService:UserService,private route: ActivatedRoute) { 

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

    var elems = document.querySelectorAll('.datepicker');
    this.calendar = M.Datepicker.init(elems);
    console.log("heyy",this.calendar)


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
