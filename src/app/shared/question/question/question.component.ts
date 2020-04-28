import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
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
      },
      {
        quest:"Número de dependientes económicos",
        opts:[""],
        resp:"",
        value:""
      }
    ]

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
            quest:"Fecha en que inició su actividad productiva",
            opts:[""],
            resp:"",
            value:""
          }, 
          {
            quest:"¿Cuál es el destino del crédito?",
            opts:[""],
            resp:"",
            value:""
          }, 
          {
            quest:"¿Cuál es el propósito del proyecto?",
            opts:[""],
            resp:"",
            value:""
          }, 
          {
            quest:"Registre el total de ingresos que obtuvo el negocio durante el ejercicio fiscal anterior. Por favor incluya tanto los ingresos derivados como los no derivados de la actividad, además de los apoyos del gobierno que haya recibido.",
            opts:["No sé","**monto**","Si sé, pero prefiero no  declararlo"],
            resp:"",
            value:""
          }, 
          {
            quest:"Registre la cantidad que pagó la empresa por los siguientes conceptos durante el ejercicio fiscal anterior:",
            opts:[""],
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
            quest:"Indique el monto de financiamiento que haya recibido de cada una de estas fuentes durante el ejercicio fiscal anterior (seleccionar una o más de las siguientes opciones)",
            opts:["No contó con ningún financiamiento","Recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas","Préstamos de familiares y amigos que no tienen participación en la empresa","Sistema ﬁnanciero formal ( bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)","Prestamistas particulares (personas que prestan dinero)","Crédito de proveedores","Recursos de inversionistas privados","Otro"],
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
          }]
  constructor() { }

  ngOnInit() {
  }

}
