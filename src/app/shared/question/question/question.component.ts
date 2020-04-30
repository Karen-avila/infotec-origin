import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  sec12=[
    {
      quest:"¿Cuantas personas trabajan en su negocio?",
      opts:"",
      resp:"",
      value:""
    },
    {
      quest:"¿Cuantas personas trabajan en su negocio?",
      opts:"",
      resp:"",
      value:""
    },
    {
      quest:"¿Cuantas personas trabajan en su negocio?",
      opts:"",
      resp:"",
      value:""
    }
  ];
  scrPn=[
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
    }
  ];

  scrPm=[
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
    }
  ];

  scrRep=[
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
    }
  ];

  scrDir=[
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
    }
  ];

  sec5=[
    {
      quest:"Estado civil",
      opts:["Soltero","Casado","Viudo","Divorciado","Unión Libre","Separado"],
      resp:"",
      value:""
    },
    {
        quest:"Nivel de Estudios del Solicitante",
        opts:["Ninguna","Primaria incompleta","Primaria completa","Secuendaria incompleta","Secundaria completa","Preparatoria o bachillerato incompleto","Preparatoria o bachillerato completo","Técnica o comercial incompleta","Técnica o comercial completa","Licenciatura incompleta","Licenciatura incompleta","Posgrado"],
        resp:"",
        value:""
      },
      {
        quest:"¿Habla usted alguna lengua indígena?",
        opts:["Sí","No"],
        resp:"",
        value:""
      }
    ];

    sec6=[
        {
          quest:"¿Cuántas personas trabajan en su negocio?",
          opts:[""],
          resp:"",
          value:""
        }, 
        {
            quest:"¿Participó en la convocatoria 2.1 Desarrollo y Fortalecimiento Empresarial de la SE?",
            opts:["Sí","No"],
            resp:"",
            value:""
          }, 
          {
            quest:"¿Recibió capacitación vinculada a su crédito proveniente de alguna organización?",
            opts:["Sí","No"],
            resp:"",
            value:""
          }
        ];

formScrPn : FormGroup;
formScrPm : FormGroup;
formScrRep : FormGroup;
formScrDir : FormGroup;

  constructor() { }

  ngOnInit() {

    this.formScrPn = new FormGroup({
              scrPn0: new FormControl(null, [Validators.required]),
              scrPn1: new FormControl(null, [Validators.required]),
              scrPn2: new FormControl(null, [Validators.required])
    });

    this.formScrPm = new FormGroup({
      scrPm0: new FormControl(null, [Validators.required]),
      scrPm1: new FormControl(null, [Validators.required]),
      scrPm2: new FormControl(null, [Validators.required])
});

this.formScrRep = new FormGroup({
  scrRep0: new FormControl(null, [Validators.required]),
  scrRep1: new FormControl(null, [Validators.required]),
  scrRep2: new FormControl(null, [Validators.required])
});

this.formScrDir = new FormGroup({
  scrDir0: new FormControl(null, [Validators.required]),
  scrDir1: new FormControl(null, [Validators.required]),
  scrDir2: new FormControl(null, [Validators.required])
});

  }

  scrPnSend(){
    console.log("form is valid?", this.formScrPn.valid);
    if(this.formScrPn.valid){
      console.log("form", this.formScrPn.value);
      //enviar datos a back
    } 
  }

  scrPmSend(){
    console.log("form is valid?", this.formScrPm.valid);
    if(this.formScrPm.valid){
      console.log("form", this.formScrPm.value);
      //enviar datos a back
    } 
  }

  scrRepSend(){
    console.log("form is valid?", this.formScrRep.valid);
    if(this.formScrRep.valid){
      console.log("form", this.formScrRep.value);
      //enviar datos a back
    } 
  }

  scrDirSend(){
    console.log("form is valid?", this.formScrDir.valid);
    if(this.formScrDir.valid){
      console.log("form", this.formScrDir.value);
      //enviar datos a back
    } 
  }

}
