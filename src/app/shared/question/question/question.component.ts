import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare const MStepper: any;
import * as M from 'materialize-css';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  calendar;
  model="qcQcn00";

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
    },
    {
      quest:"¿El negocio tiene un plan de sucesión para que otra persona se encargue de la dirección en caso de ser necesario? ",
      opts:["No se ha pensado que alguien más se ocupe de la dirección del negocio","La dirección la tomará un familiar pero no conoce el negocio","La dirección la tomará un familiar que ya conoce el negocio","La dirección la tomará alguien profesional auqnue no sea de la familia"],
      resp:"",
      value:""
    }
  ];
  qcQc=[
    {
      quest:"Estado civil",
      opts:["Soltero","Casado","Viudo","Divorciado","Unión Libre","Separado"],
      resp:"",
      value:""
    },
    {
        quest:"Nivel de Estudios del Solicitante",
        opts:["Ninguna","Primaria incompleta","Primaria completa","Secuendaria incompleta","Secundaria completa","Preparatoria o bachillerato incompleto","Preparatoria o bachillerato completo","Técnica o comercial incompleta","Técnica o comercial completa","Licenciatura incompleta","Licenciatura completa","Posgrado"],
        resp:"",
        value:""
      },
      {
        quest:"¿Habla usted alguna lengua indígena?",
        opts:["Sí","No"],
        resp:"",
        value:""
      },
      {
        quest:"En su vida diaria, ¿tiene dificultad al realizar las siguientes actividades? (Seleccionar una o varias opciones)",
        opts:["Caminar, moverse subir o bajar","Ver, aun usando lentes","Hablar, comunicarse o conversar","Oir, aun usando aparato auditivo","Vestirse, bañarse o comer","Poner atención o aprender cosas sencillas","Tiene alguna limitación mental","No tiene dificultad física o mental"],
        resp:"",
        value:""
      },
      {
        quest:"¿Usa usted internet habitualmente?",
        opts:["Sí","No"],
        resp:"",
        value:""
      },
      {
        quest:"¿Cuál es su papel en el hogar?",
        opts:["Es jefe(a) de familia","Es esposo(a) del jefe(a) de familia","Es hijo(a) del jefe(a) de familia","Otra relación con el jefe(a) de familia"],
        resp:"",
        value:""
      },
      {
        quest:"Su vivienda es:",
        opts:["Rentada","Prestada","Propia pero la están pagando","Es propia","Está intestada o en litigio","Otra situación"],
        resp:"",
        value:""
      }
    ];
    qcQc1=[
      {
        quest:"Número de dependientes económicos",
        opts:[""],
        resp:"",
        value:""
      }
  ];
  qcQcn=[
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
    }, 
    {
      quest:"¿Ha solicitado crédito anteriormente?",
      opts:["Sí","No"],
      resp:"",
      value:""
    }, 
    {
      quest:"¿Sus ingresos han mejorado después de recibir un crédito?",
      opts:["Sí","No","No aplica"],
      resp:"",
      value:""
    }, 
    {
      quest:"Además de su oficina, comercio, o local principal, ¿tiene otra(s) oficina(s), comercio(s), local(es) o sucursal(es)?",
      opts:["Sí","No"],
      resp:"",
      value:""
    }, 
    {
      quest:"¿Cómo se lleva la contabilidad de la empresa?",
      opts:["Se utiliza un cuaderno o una libreta de apuntes para llevar la contabilidad","Se utiliza los servicios de un contador o profesional para llevar la contabilidad","Se utiliza el “Portal Mis Cuentas” del SAT","Se utiliza un paquete de contabilidad por parte de la empresa","No se lleva la contabilidad de la empresa","Otro"],
      resp:"",
      value:""
    }, 
    {
      quest:"¿En la empresa se realizan actualmente algunas de las siguientes actividades? (seleccionar una o más de las siguientes opciones)",
      opts:["Se lleva registros escritos del negocio. Es decir, se tiene un lugar, cuaderno, archivo o computadora donde se concentra la información de las operaciones diarias del negocio","Se sabe cuánto dinero en efectivo tiene el negocio en un momento determinado","Se sabe si las ventas de un producto (bien o servicio) en particular están subiendo o bajando de un mes a otro","Se sabe cuánto le cuesta al negocio generar cada uno de sus principales productos (bienes o servicios). Por ejemplo, si tiene que calcular cuánto le cuesta producir una galleta, se hacen las cuentas de cuánto gasta en comprar harina, azúcar, leche, luz para usar la batidora, gas para el horno, renta del local, etcétera; otro ejemplo: si se ofrece un servicio de transporte, se hacen las cuentas de cuánto se gasta en el consumo de gasolina, casetas de peaje, etcétera","Se sabe de qué productos (bienes o servicios) se obtienen más ganancias por cada uno que vende","El negocio no lleva registros y no cuenta con información que permita conocer a detalle su operación"],
      resp:"",
      value:""
    }, 
    {
      quest:"¿La empresa tiene cuenta bancaria exclusiva para el manejo del dinero del negocio?",
      opts:["Sí","No"],
      resp:"",
      value:""
    }, 
    {
      quest:"Durante el ejercicio fiscal anterior, ¿la empresa tuvo necesidad de invertir en equipo, vehículos, inmuebles, capacitación, etcétera y no pudo por falta de dinero?",
      opts:["Sí","No"],
      resp:"",
      value:""
    }, 
    {
      quest:"¿Durante el ejercicio fiscal anterior se otorgó capacitación al personal de la empresa (usando capacitadores internos o externos)?",
      opts:["Sí","No"],
      resp:"",
      value:""
    },
    {
      quest:"¿Cuál fue la principal causa por la que durante el ejercicio fiscal anterior no se otorgó capacitación al personal de la empresa?",
      opts:["Capacitar interrumpe la producción","Capacitar hace que el personal demande un salario mayor, busque otro trabajo o se independice","No se encontró capacitador conforme a las necesidades de la empresa","Se tenía la intención de capacitar pero es muy caro","Se consideró que el conocimiento y las habilidades técnicas del personal son adecuadas","No vale la pena porque la empresa tiene muy alta rotación de personal","En años previos se impartió la capacitación necesaria","Se solicitó la capacitación a instituciones públicas, pero no se pudo obtener","No hay beneﬁcios palpables como resultado de la capacitación","Se utiliza gente externa que ya viene capacitada","El horario de la empresa no lo permite","Otra"],
      resp:"",
      value:""
    }, 
    {
      quest:"¿Cuál es el motivo principal por el que se inició en este negocio o actividad? (Seleccionar una o varias opciones)",
      opts:["Por tradición familiar o lo heredó","Para complementar el ingreso familiar","Para mejorar el ingreso","Tenía dinero y encontró una buena oportuindad","Para ejercer su oficio, carrera o profesión","Fue la única manera que tuvo para obtener un ingreso","No tenía la experiencia requerida para un empleo","No tenía la escolaridad o capacitación requerida para un empleo","Estaba sobrecapacitado para un empleo","Los empleos que encontró estaban mal pagados","Requería un horario flexible","No había oportunidades de empleo","Otra razón"],
      resp:"",
      value:""
    }, 
    {
      quest:"En su negocio o actividad, ¿cuenta con un local para trabajar sea o no de su propiedad? (Seleccione una opción o más de una si tiene varios locales)",
      opts:["Sí, es un local independiente","Sí, es un local o instalación que forma parte de un conjunto de locales","No"],
      resp:"",
      value:""
    }, 
    {
      quest:"En caso de ser local independiente (fuera de un techo común), ¿éste es? (Seleccionar una o varias opciones)",
      opts:["Tienda, accesoria o tendajón","Taller (de servicios o de reparación)","Fábrica, tortillería, panadería","Oficina, despacho, consultorio"],
      resp:"",
      value:""
    }, 
    {
      quest:"Si no cuenta con un local, ¿en dónde se realizan las actividades de su negocio? (Seleccionar una o varias opciones)",
      opts:["Vehículo con o sin motor","Puesto fijo fuera de un techo común","Puesto semifijo bajo un techo común en pasillos de un centro comercial","Puesto semifijo en un tianguis","En un domicilio particular con una instalación especial","En un domicilio particular sin una instalación especial","Otro lugar"],
      resp:"",
      value:""
    }

  ];
  qcqn1=[
  {
    quest:"¿Cuál es el destino del crédito; es decir, específicamente para qué va a usar el crédito en su negocio? Por ejemplo, comprar un vehículo para repartir a domicilio.",
    opts:[""],
    resp:"",
    value:""
  }, 
  {
    quest:"¿Cuál es el propósito del proyecto; es decir, en qué espera que mejore su negocio debido al crédito que solicita? Por ejemplo, incrementar las ventas con la entrega a domicilio.",
    opts:[""],
    resp:"",
    value:""
  }];

  qcqn2=[
    {
      quest:"¿Cuántas personas trabajan en su negocio?",
      opts:[""],
      resp:"",
      value:""
    }, 
    {
      quest:"¿De cuánto efectivo dispone actualmente para cubrir las operaciones del negocios? Incluya lo que guarda en su casa, en el banco o en el negocio.",
      opts:[""],
      resp:"",
      value:""
    }, 
    {
      quest:"¿Al día de hoy cuánto le deben por venta de bienes a crédito o servicios realizados y que aún no le hayan terminado de pagar? ",
      opts:[""],
      resp:"",
      value:""
    }, 
    {
      quest:"Cuánto obtendría si vendiera el material de oficina, la maquinaria que usa en su negocio, aparatos de su propiedad o el local del negocio en caso de que sea suyo?",
      opts:[""],
      resp:"",
      value:""
    }, 
    {
      quest:"Pensando en los últimos 6 meses, en promedio, ¿cuánto vende o ingresa por la realización de sus servicios cada mes sin descontar los gastos?",
      opts:[""],
      resp:"",
      value:""
    }, 
    {
      quest:"Pensando en los últimos 6 meses, en promedio, ¿a cuánto ascienden, cada mes,  otros ingresos obtenidos además de los generados por su actividad principal del negocio?",
      opts:[""],
      resp:"",
      value:""
    },
    {
      quest:"En promedio ¿cuánto gasta cada vez que surte su negocio con mercancías para la venta de bienes o realización de sus servicios?",
      opts:[""],
      resp:"",
      value:""
    }];

    qcqcn3=[ 
      {
        quest:"¿Con qué frecuencia surte su negocio con mercancías o materias primas para la venta de bienes o la prestación de sus servicios?",
        opts:["Diariamente","Cada semana","Cada quincena","Cada mes","Cada 2 meses","Cada 3 meses","Cada 4 meses","Cada 6 meses","Cada año"],
        resp:"",
        value:""
      }, 
      {
        quest:"¿Cuándo fue la última vez que surtió su negocio con mercancías o materias primas para la venta de bienes o prestación de sus servicios?",
        opts:["Ayer","Hace una semana","Hace dos semanas","Hace un mes","Hace 2 meses","Hace 3 meses","Hace 4 meses","Hace 5 meses","Hace 6 meses","Hace 1 año","Hace más de un año"],
        resp:"",
        value:""
      }];

      qcqcn4=[
        {
          quest:"Pensando en los últimos 6 meses, en promedio, indique cuánto paga cada mes por los siguientes conceptos:",
          opts:["Sueldos, salarios o cualquier otro pago a los trabajadores del negocio","Renta de locales o espacios comerciales","Servicios públicos","Transporte para actividades del negocio","Pago por franquicias","Promoción y publicidad","Pago de servicios contables o legales","Mantenimiento del negocio","Licencias de software","Impuestos","Otros gastos no incluidos en la lista pero que son necesarios para la operación de su negocio"],
          resp:"",
          value:""
        }];

        qcqcn0=[
          {
            quest:"¿Fecha en que inició su actividad productiva?",
            opts:[""],
            resp:"",
            value:""
          }
      ];

formScrPn : FormGroup;
formScrPm : FormGroup;
formScrRep : FormGroup;
formScrDir : FormGroup;
formQcQc : FormGroup;
formQcQcn : FormGroup;

  constructor() { }

  ngOnInit() {

    /*var elems = document.querySelectorAll('.datepicker');
    this.calendar = M.Datepicker.init(elems);
    console.log("heyy",this.calendar)
*/
   M.AutoInit();
    this.formScrPn = new FormGroup({
              scrPn0: new FormControl(null, [Validators.required]),
              scrPn1: new FormControl(null, [Validators.required]),
              scrPn2: new FormControl(null, [Validators.required]),
              scrPn3: new FormControl(null, [Validators.required]),
              scrPn4: new FormControl(null, [Validators.required]),
              scrPn5: new FormControl(null, [Validators.required]),
              scrPn6: new FormControl(null, [Validators.required])
    });

    this.formScrPm = new FormGroup({
      scrPm0: new FormControl(null, [Validators.required]),
      scrPm1: new FormControl(null, [Validators.required]),
      scrPm2: new FormControl(null, [Validators.required]),
      scrPm3: new FormControl(null, [Validators.required]),
      scrPm4: new FormControl(null, [Validators.required]),
      scrPm5: new FormControl(null, [Validators.required]),
      scrPm6: new FormControl(null, [Validators.required]),
      scrPm7: new FormControl(null, [Validators.required]),
      scrPm8: new FormControl(null, [Validators.required]),
      scrPm9: new FormControl(null, [Validators.required]),
      scrPm10: new FormControl(null, [Validators.required])
});

this.formScrRep = new FormGroup({
  scrRep0: new FormControl(null, [Validators.required]),
  scrRep1: new FormControl(null, [Validators.required]),
  scrRep2: new FormControl(null, [Validators.required]),
  scrRep3: new FormControl(null, [Validators.required]),
  scrRep4: new FormControl(null, [Validators.required]),
  scrRep5: new FormControl(null, [Validators.required])
});

this.formScrDir = new FormGroup({
  scrDir0: new FormControl(null, [Validators.required]),
  scrDir1: new FormControl(null, [Validators.required]),
  scrDir2: new FormControl(null, [Validators.required]),
  scrDir3: new FormControl(null, [Validators.required])
});

this.formQcQc = new FormGroup({
  qcQc0: new FormControl(null, [Validators.required]),
  qcQc1: new FormControl(null, [Validators.required]),
  qcQc2: new FormControl(null, [Validators.required]),
  qcQc3: new FormControl(null, [Validators.required]),
  qcQc4: new FormControl(null, [Validators.required]),
  qcQc5: new FormControl(null, [Validators.required]),
  qcQc6: new FormControl(null, [Validators.required]),
  qcQcI0: new FormControl(null, [Validators.required])
});

this.formQcQcn = new FormGroup({
  qcQcn0: new FormControl(null, [Validators.required]),
  qcQcn1: new FormControl(null, [Validators.required]),
  qcQcn2: new FormControl(null, [Validators.required]),
  qcQcn3: new FormControl(null, [Validators.required]),
  qcQcn4: new FormControl(null, [Validators.required]),
  qcQcn5: new FormControl(null, [Validators.required]),
  qcQcn6: new FormControl(null, [Validators.required]),
  qcQcn7: new FormControl(null, [Validators.required]),
  qcQcn8: new FormControl(null, [Validators.required]),
  qcQcn9: new FormControl(null, [Validators.required]),
  qcQcn10: new FormControl(null, [Validators.required]),
  qcQcn11: new FormControl(null, [Validators.required]),
  qcQcn12: new FormControl(null, [Validators.required]),
  qcQcn13: new FormControl(null, [Validators.required]),
  qcQcn14: new FormControl(null, [Validators.required]),
  qcQcn010: new FormControl(null, [Validators.required]),
  qcQcn011: new FormControl(null, [Validators.required]),
  qcQcn020: new FormControl(null, [Validators.required]),
  qcQcn021: new FormControl(null, [Validators.required]),
  qcQcn022: new FormControl(null, [Validators.required]),
  qcQcn023: new FormControl(null, [Validators.required]),
  qcQcn024: new FormControl(null, [Validators.required]),
  qcQcn025: new FormControl(null, [Validators.required]),
  qcQcn026: new FormControl(null, [Validators.required]),
  qcQcn030: new FormControl(null, [Validators.required]),
  qcQcn031: new FormControl(null, [Validators.required]),
  qcQcn00: new FormControl(null,[Validators.required])
 //qcQcnI0: new FormControl(null, [Validators.required])
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

  qcQcSend(){
    console.log("form is valid?", this.formQcQc.valid);
    if(this.formQcQc.valid){
      console.log("form", this.formQcQc.value);
      //enviar datos a back
    } 
  }

  qcQcnSend(){
    console.log("form is valid?", this.formQcQcn.valid);
    if(this.formQcQcn.valid){
      console.log("form", this.formQcQcn.value);
      //enviar datos a back
    } 
  }

}
