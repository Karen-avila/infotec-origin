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
  constructor() { }

  ngOnInit() {
  }

}
