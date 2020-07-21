import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare const MStepper: any;
import * as M from 'materialize-css';
import swal from 'sweetalert';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  calendar;
  sfina5 = false;
  sfina6 = false;
  sfina7 = false;
  sfina8 = false;
  sfina9 = false;

    /* Perfil de negocio */
  scrPerNeg=[
    {
      quest:"Antigüedad de negocio.",
      value_quest:"0.2",
      opts:["Menos de 12 meses","De 1 a 2 años","De 3 a 5 años","De 6 a 10 años","Más de 10 años"],
      resp:"",
      values:["20","35","50","70","100"],
      value: ""
    },
    {
      quest:"Tipo de negocio.",
      value_quest:"0.1",
      opts:["Ventas al menudeo","Manufactura","Ventas al mayoreo","Servicios","Agropecuario"],
      resp:"",
      values:["20","40","30","20","100"],
      value:""
    },
    {
      quest:"¿Principalmente a qué plazo se pagan las compras?",
      value_quest:"0.2",
      opts:["Se paga por adelantado","Se paga al momento","Se paga en menos de 7 días","Se paga de 7 a 14 días","Se paga de 15 a 30 días","Se paga antes de 30 días"],
      resp:"",
      values:["0","10","40","60","80","100"],
      value:""
    },
    {
      quest:"¿Principalmente a qué plazo se cobran las ventas?",
      value_quest:"0.2",
      opts:["Se cobran en más de 60 días","Se cobran de 31 a 60 días","Se cobra de 15 a 30 días","Se cobra de 8 a 14 días","Se cobra de 7 días o menos", "Se cobra al momento"],
      resp:"",
      values:["0","60","40","20","80","100"],
      value:""
    },
    {
      quest:"¿Normalmente cómo se compone el inventario del negocio?",
      value_quest:"0.1",
      opts:["Menos del 25% del inventario corresponde a materias primas","Entre 25% y 50% del inventario corresponde a materias primas","Entre 51% y 75% del inventario corresponde a materias primas","Más de 75% del inventario corresponde a materias primas"],
      resp:"",
      values:["0","20","30","50"],
      value:""
    },
    {
      quest:"¿Desde hace cuánto tiempo el negocio es formal?",
      value_quest:"0.1",
      opts:["Menos de 12 meses","De 1 a 2 años","De 3 a 5 años","De 6 a 10 años","Más de 10 años"],
      resp:"",
      values:["20","35","50","70","100"],
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor a los propietarios actuales del negocio.",
      value_quest:"0.1",
      opts:["El negocio tiene un solo propietario","El negocio tiene varios propietarios pero uno toma las decisiones","El negocio tiene varios propietarios y varios toman decisiones"],
      resp:"",
      values:["20","30","50"],
      value:""
    }
  ];

  /* Perfil de mercado */

  scrPerMer=[
    {
      quest:"¿El negocio ofrece varios productos o servicios?",
      value_quest:"0.1",
      opts:["Un solo producto o marca","Un solo producto de diferentes marcas","Múltiples productos"],
      resp:"",
      values:["30","40","50"],
      value:""
    },
    {
      quest:"¿El producto o servicio es de temporada o se ofrece en cualquier época del año?",
      value_quest:"0.1",
      opts:["De temporada","En cualquier época del año"],
      resp:"",
      values:["0","100"],
      value:""
    },
    {
      quest:"¿Cómo es la fuente principal de suministros del negocio?",
      value_quest:"0.1",
      opts:["El negocio depende de importaciones","El negocio no depende de importaciones"],
      resp:"",
      values:["0","100"],
      value:""
    },
    {
      quest:"Número de proveedores.",
      value_quest:"0.1",
      opts:["1 solo proveedor","2 a 5 proveedores","Más de 5 proveedores","No aplica"],
      resp:"",
      values:["0","50","100","100"],
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor las ventas que se hace a los 5 mejores clientes.",
      value_quest:"0.05",
      opts:["Menos del 25% de las ventas se hace a los 5 principales clientes","Entre el 25% y el 50% de la venta se hace a los principales clientes","Entre el 51% y el 75% de las ventas se hace a los principales clientes","Más del 75% de las ventas se hace a los 5 principales clientes"],
      resp:"",
      values:["60","40","20","10"],
      value:""
    },
    {
      quest:"¿Los precios de los productos o servicios que ofrece el negocio suben y bajan durante el año?",
      value_quest:"0.05",
      opts:["No cambian","Suben y bajan moderadamente","Suben y bajan mucho"],
      resp:"",
      values:["100","60","40"],
      value:""
    },
    {
      quest:"¿Cuántos competidores tiene el negocio?",
      opts:["Producto o servicio único","Menos de 10 competidores","De 10 hasta 50 competidores","Más de 50 competidores"],
      value_quest:"0.05",
      resp:"",
      values:["100","60","30","10"],
      value:""
    },
    {
      quest:"¿Qué tan probable es que el producto o servicio que se ofrece se reemplace o quede obsoleto durante los próximos 2 años?",
      value_quest:"0.05",
      opts:["Poco","Más o menos","Mucho"],
      resp:"",
      values:["60","40","0"],
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor el sector o mercado que atiende el negocio.",
      value_quest:"0.1",
      opts:["El sector o mercado ya pasó por su mejor momento y ahora está disminuyendo","El sector o mercado está en su mejor momento pero ya no crederá","El sector o mercado está en crecimiento"],
      resp:"",
      values:["0","50","100"],
      value:""
    },
    {
      quest:"¿Normalmente el negocio depende de apoyos del gobierno o permisos especiales de éste?",
      value_quest:"0.2",
      opts:["Si","No"],
      resp:"",
      values:["0","100"],
      value:""
    },
    {
      quest:"¿Considera que la regulación limita el negocio?",
      value_quest:"0.1",
      opts:["Si","No","Las actividades del negocio no necesitan regularse o controlarse"],
      resp:"",
      values:["0","50","100"],
      value:""
    }
  ];

  /* Reputación */

  scrRep=[
    {
      quest:"¿Cómo es la reputación del negocio con los clientes?",
      value_quest:"0.13",
      opts:["No favorable","Aceptable","Favorable"],
      resp:"",
      values:["0","50","100"],
      value:""
    },
    {
      quest:"¿Cómo es la reputación del negocio con los proveedores?",
      value_quest:"0.13",
      opts:["No favorable","Aceptable","Favorable"],
      resp:"",
      values:["0","50","100"],
      value:""
    },
    {
      quest:"¿Hacé cuánto tiempo tienen los dueños del negocio cuentas bancarias?",
      value_quest:"0.15",
      opts:["Menos de 12 meses","De 1 a 2 años","De 3 a 5 años","De 6 a 10 años","Más de 10 años"],
      resp:"",
      values:["0","25","50","75","100"],
      value:""
    },
    {
      quest:"Seleccione la opción que describa mejor la relación de los dueños con los bancos.",
      value_quest:"0.3",
      opts:["Los dueños tienen o han tenido problemas mayores con los bancos","Los dueños son nuevos clientes y adquirieron un crédito por primera vez","Los dueños ya eran clientes del banco pero apenas adquirieron un crédito por primera vez","Los dueños tienen o han tenido problemas menores con los bancos"],
      resp:"",
      values:["0","20","50","100"],
      value:""
    },
    {
      quest:"¿Cómo calificaría el historial de crédito de los dueños con los bancos?",
      value_quest:"0.15",
      opts:["Los dueños tienen un mal historial crediticio con los bancos","Los dueños tienen un buen historial crediticio con los bancos","Los dueños no tienen historial crediticio con los bancos"],
      resp:"",
      values:["0","100","20"],
      value:""
    },
    {
      quest:"¿Los dueños tienen juicios en contra o asuntos legales por resolver?",
      value_quest:"0.14",
      opts:["Si","No"],
      resp:"",
      values:["0","100"],
      value:""
    }
  ];

  /* Dirección */

  scrDir=[
    {
      quest:"¿Cuántos años de experiencia en el negocio tienen los dueños del negocio?",
      value_quest:"0.35",
      opts:["Menos de 1 año","1 a 5 años","6 a 10 años","Más de 10 años"],
      resp:"",
      values:["0","40","80","100"],
      value:""
    },
    {
      quest:"¿Cuál es la escolaridad de la persona que dirige el negocio?",
      value_quest:"0.15",
      opts:["Ninguna","Primaria incompleta","Primaria completa","Secundaria incompleta","Secundaria completa","Preparatoria o Bachillerato incompleto","Preparatoria o Bachillerato completo","Técnica o comercial incompleta","Técnica o comercial completa","Licenciatura incompleta","Licenciatura completa","Posgrado"],
      resp:"",
      values:["0","10","20","30","40","60","70","60","70","80","90","100"],
      value:""
    },
    {
      quest:"¿Cuál es el rango de edad de la persona que dirige el negocio?",
      value_quest:"0.2",
      opts:["Menos de 25 años","25 a 34 años","35 a 55 años","56 a 65 años","Más de 65 años"],
      resp:"",
      values:["0","30","70","30","0"],
      value:""
    },
    {
      quest:"¿El negocio tiene un plan de sucesión para que otra persona se encargue de la dirección en caso de ser necesario? ",
      value_quest:"0.3",
      opts:["No se ha pensado que alguien más se ocupe de la dirección del negocio","La dirección la tomará un familiar pero no conoce el negocio","La dirección la tomará un familiar que ya conoce el negocio","La dirección la tomará alguien profesional auqnue no sea de la familia"],
      resp:"",
      values:["0","40","80","100"],
      value:""
    }
  ];

  /* Queremos conocerte */
  
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



      
     
      /* Queremos conocer tu negocio */
        preg1=[
          {
            quest:"¿Fecha en que inició su actividad productiva?",
            opts:[""],
            resp:"",
            value:""
          }  ];

        preg2=[
            {
              quest:"Registre el total de ingresos que obtuvo el negocio durante el ejercicio fiscal anterior. Por favor incluya tanto los ingresos derivados como los no derivados de la actividad, además de los apoyos del gobierno que haya recibido",
              opts:["No sé","Si sé, pero prefiero no  declararlo"],
              resp:"",
              value:""
            }
          ];
        preg2m=[
              {
              quest:"Monto",
              opts:[""],
              resp:"",
              value:""
              }
          ];
    

        preg3=[
          {
            quest:"¿Cuántas personas trabajan en su negocio?",
            opts:[""],
            resp:"",
            value:""
          }];
    
        preg4a5=[
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

          preg6a11=[

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

            preg12a13=[
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

            preg14=[
                {
                  quest:"Sueldos, salarios o cualquier otro pago a los trabajadores del negocio",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Renta de locales o espacios comerciales",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Servicios públicos",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Transporte para actividades del negocio",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Pago por franquicias",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Promoción y publicidad",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Pago de servicios contables o legales",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Mantenimiento del negocio",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Licencias de software",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Impuestos",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Otros gastos no incluidos en la lista pero que son necesarios para la operación de su negocio",
                  opts:[""],
                  resp:"",
                  value:""
                }
        
              ];

              preg15r=[
                {
                  quest:"No cuento con ningún financiamiento.",
                  opts:[""],
                  resp:"",
                  value:""
                }];

              preg15=[
                {
                  quest:"Recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Préstamos de familiares y amigos que no tienen participación en la empresa. ",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Sistema ﬁnanciero formal (bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Prestamistas particulares (personas que prestan dinero)",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Crédito de proveedores",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Recursos de inversionistas privados",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Otras",
                  opts:[""],
                  resp:"",
                  value:""
                }
        
              ];
        
              preg16r=[
                {
                  quest:"No cuento con ningún financiamiento.",
                  opts:[""],
                  resp:"",
                  value:""
                }];

              preg16=[
                {
                  quest:"Recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Préstamos de familiares y amigos que no tienen participación en la empresa",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Sistema ﬁnanciero formal (bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Prestamistas particulares (personas que prestan dinero)",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Crédito de proveedores ",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Recursos de inversionistas privados",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Otras",
                  opts:[""],
                  resp:"",
                  value:""
                }
            ];

            preg17r=[
              {
                quest:"No cuento con ningún financiamiento.",
                opts:[""],
                resp:"",
                value:""
              }];
        
            preg17=[
              {
                quest:"Préstamos de familiares y amigos que no tienen participación en la empresa",
                opts:[""],
                resp:"",
                value:""
              },
              {
                quest:"Sistema ﬁnanciero formal (bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)",
                opts:[""],
                resp:"",
                value:""
              },
              {
                quest:"Prestamistas particulares (personas que prestan dinero)",
                opts:[""],
                resp:"",
                value:""
              },
              {
                quest:"Crédito de proveedores",
                opts:[""],
                resp:"",
                value:""
              },
              {
                quest:"Recursos de inversionistas privados",
                opts:[""],
                resp:"",
                value:""
              },
              {
                quest:"Otras",
                opts:[""],
                resp:"",
                value:""
              }
            ];

              preg18=[
                {
                  quest:"Luz",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Gas o algún combustible",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Telecomunicaciones (teléfono fijo o celular para el negocio e internet)",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Materias primas consumidas (a costo de adquisición)",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Mercancías compradas para reventa",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Materiales consumidos para la prestación del servicio",
                  opts:[""],
                  resp:"",
                  value:""
                },
                {
                  quest:"Otros",
                  opts:[""],
                  resp:"",
                  value:""
                }
              ];
            
              preg19a28=[
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
                }
            
              ];
              preg29=[
                {
                  quest:"¿En la empresa se realizan actualmente algunas de las siguientes actividades? (seleccionar una o más de las siguientes opciones)",
                  opts:["Se lleva registros escritos del negocio. Es decir, se tiene un lugar, cuaderno, archivo o computadora donde se concentra la información de las operaciones diarias del negocio","Se sabe cuánto dinero en efectivo tiene el negocio en un momento determinado","Se sabe si las ventas de un producto (bien o servicio) en particular están subiendo o bajando de un mes a otro","Se sabe cuánto le cuesta al negocio generar cada uno de sus principales productos (bienes o servicios). Por ejemplo, si tiene que calcular cuánto le cuesta producir una galleta, se hacen las cuentas de cuánto gasta en comprar harina, azúcar, leche, luz para usar la batidora, gas para el horno, renta del local, etcétera; otro ejemplo: si se ofrece un servicio de transporte, se hacen las cuentas de cuánto se gasta en el consumo de gasolina, casetas de peaje, etcétera","Se sabe de qué productos (bienes o servicios) se obtienen más ganancias por cada uno que vende","El negocio no lleva registros y no cuenta con información que permita conocer a detalle su operación"],
                  resp:"",
                  value:""
                }];
                preg30=[
                {
                  quest:"¿Cuál es el motivo principal por el que se inició en este negocio o actividad? (Seleccionar una o varias opciones)",
                  opts:["Por tradición familiar o lo heredó","Para complementar el ingreso familiar","Para mejorar el ingreso","Tenía dinero y encontró una buena oportuindad","Para ejercer su oficio, carrera o profesión","Fue la única manera que tuvo para obtener un ingreso","No tenía la experiencia requerida para un empleo","No tenía la escolaridad o capacitación requerida para un empleo","Estaba sobrecapacitado para un empleo","Los empleos que encontró estaban mal pagados","Requería un horario flexible","No había oportunidades de empleo","Otra razón"],
                  resp:"",
                  value:""
                }];
                preg31=[
                {
                    quest:"En su negocio o actividad, ¿cuenta con un local para trabajar sea o no de su propiedad? (Seleccione una opción o más de una si tiene varios locales)",
                    opts:["Sí, es un local independiente","Sí, es un local o instalación que forma parte de un conjunto de locales","No"],
                    resp:"",
                    value:""
                }];
                preg32=[
                {
                    quest:"En caso de ser local independiente (fuera de un techo común), ¿éste es? (Seleccionar una o varias opciones)",
                    opts:["Tienda, accesoria o tendajón","Taller (de servicios o de reparación)","Fábrica, tortillería, panadería","Oficina, despacho, consultorio"],
                    resp:"",
                    value:""
                }];
                preg33=[
                {
                    quest:"Si no cuenta con un local, ¿en dónde se realizan las actividades de su negocio? (Seleccionar una o varias opciones)",
                    opts:["Vehículo con o sin motor","Puesto fijo fuera de un techo común","Puesto semifijo bajo un techo común en pasillos de un centro comercial","Puesto semifijo en un tianguis","En un domicilio particular con una instalación especial","En un domicilio particular sin una instalación especial","Otro lugar"],
                    resp:"",
                    value:""
                }
              ];



formScrPerNeg : FormGroup;
formScrPerMer : FormGroup;
formScrRep : FormGroup;
formScrDir : FormGroup;
formQcQc : FormGroup;
formQcQcn : FormGroup;
instPefNeg;
instQrmCnct;
prins;

  constructor() { }

  ngOnInit() {

    /*var elems = document.querySelectorAll('.datepicker');
    this.calendar = M.Datepicker.init(elems);
    console.log("heyy",this.calendar)
*/
   M.AutoInit();
   let select = document.querySelectorAll('select');
    M.FormSelect.init(select);


    this.instPefNeg = M.Collapsible.init(document.getElementById('perfilNegocio'));
    this.instQrmCnct = M.Collapsible.init(document.getElementById('queremosConocerte'));
    this.prins = M.Collapsible.init(document.getElementById('prins'));

    this.formScrPerNeg = new FormGroup({
              scrPerNeg0: new FormControl(null, [Validators.required]),
              scrPerNeg1: new FormControl(null, [Validators.required]),
              scrPerNeg2: new FormControl(null, [Validators.required]),
              scrPerNeg3: new FormControl(null, [Validators.required]),
              scrPerNeg4: new FormControl(null, [Validators.required]),
              scrPerNeg5: new FormControl(null, [Validators.required]),
              scrPerNeg6: new FormControl(null, [Validators.required])
    });

    this.formScrPerMer = new FormGroup({
      scrPerMer0: new FormControl(null, [Validators.required]),
      scrPerMer1: new FormControl(null, [Validators.required]),
      scrPerMer2: new FormControl(null, [Validators.required]),
      scrPerMer3: new FormControl(null, [Validators.required]),
      scrPerMer4: new FormControl(null, [Validators.required]),
      scrPerMer5: new FormControl(null, [Validators.required]),
      scrPerMer6: new FormControl(null, [Validators.required]),
      scrPerMer7: new FormControl(null, [Validators.required]),
      scrPerMer8: new FormControl(null, [Validators.required]),
      scrPerMer9: new FormControl(null, [Validators.required]),
      scrPerMer10: new FormControl(null, [Validators.required])
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
  preg1: new FormControl(null, [Validators.required]),
  /*preg20: new FormControl(' ',[Validators.required]), //2
  preg20: new FormControl(' ',[Validators.required]), //2
  preg2m: new FormControl(' ',[Validators.required]),//2*/
  preg3: new FormControl(null, [Validators.required]),
  preg4a50: new FormControl(null, [Validators.required]),
  preg4a51: new FormControl(null, [Validators.required]),
  preg6a110: new FormControl(null, [Validators.required]),
  preg6a111: new FormControl(null, [Validators.required]),
  preg6a112: new FormControl(null, [Validators.required]),
  preg6a113: new FormControl(null, [Validators.required]),
  preg6a114: new FormControl(null, [Validators.required]),
  preg6a115: new FormControl(null, [Validators.required]),
  preg12a130: new FormControl(null, [Validators.required]),
  preg12a131: new FormControl(null, [Validators.required]),
  preg140: new FormControl(null,[Validators.required]), 
  preg141: new FormControl(null,[Validators.required]), 
  preg142: new FormControl(null,[Validators.required]), 
  preg143: new FormControl(null,[Validators.required]), 
  preg144: new FormControl(null,[Validators.required]), 
  preg145: new FormControl(null,[Validators.required]), 
  preg146: new FormControl(null,[Validators.required]), 
  preg147: new FormControl(null,[Validators.required]), 
  preg148: new FormControl(null,[Validators.required]), 
  preg149: new FormControl(null,[Validators.required]), 
  preg1410: new FormControl(null,[Validators.required]),
  /*preg15r: new FormControl(' ',[Validators.required]), //15
  preg150: new FormControl(' ',[Validators.required]),//15
  preg151: new FormControl(' ',[Validators.required]),//15
  preg152: new FormControl(' ',[Validators.required]),//15
  preg153: new FormControl(' ',[Validators.required]),//15
  preg154: new FormControl(' ',[Validators.required]),//15
  preg155: new FormControl(' ',[Validators.required]),//15
  preg156: new FormControl(' ',[Validators.required]),//15
  preg16r: new FormControl(' ',[Validators.required]),//16
  qcQcn060: new FormControl(' ',[Validators.required]),//16
  qcQcn061: new FormControl(' ',[Validators.required]),//16
  qcQcn062: new FormControl(' ',[Validators.required]),//16
  qcQcn063: new FormControl(' ',[Validators.required]),//16
  qcQcn064: new FormControl(' ',[Validators.required]),//16
  qcQcn065: new FormControl(' ',[Validators.required]),//16
  qcQcn066: new FormControl(' ',[Validators.required]),//16
  qcQcnr07: new FormControl(' ',[Validators.required]),//17
  qcQcn070: new FormControl(' ',[Validators.required]),//17
  qcQcn071: new FormControl(' ',[Validators.required]),//17
  qcQcn072: new FormControl(' ',[Validators.required]),//17
  qcQcn073: new FormControl(' ',[Validators.required]),//17
  qcQcn074: new FormControl(' ',[Validators.required]),//17
  qcQcn075: new FormControl(' ',[Validators.required]),//17
  */
  preg180: new FormControl(null,[Validators.required]),
  preg181: new FormControl(null,[Validators.required]),
  preg182: new FormControl(null,[Validators.required]),
  preg183: new FormControl(null,[Validators.required]),
  preg184: new FormControl(null,[Validators.required]),
  preg185: new FormControl(null,[Validators.required]),
  preg186: new FormControl(null,[Validators.required]),
  preg19a280: new FormControl(null, [Validators.required]),
  preg19a281: new FormControl(null, [Validators.required]),
  preg19a282: new FormControl(null, [Validators.required]),
  preg19a283: new FormControl(null, [Validators.required]),
  preg19a284: new FormControl(null, [Validators.required]),
  preg19a285: new FormControl(null, [Validators.required]),
  preg19a286: new FormControl(null, [Validators.required]),
  preg19a287: new FormControl(null, [Validators.required]),
  preg19a288: new FormControl(null, [Validators.required]),
  preg19a289: new FormControl(null, [Validators.required]),
  preg29: new FormControl(null,[Validators.required]),
  preg30: new FormControl(null,[Validators.required]),
  preg31: new FormControl(null,[Validators.required]),
  preg32: new FormControl(null,[Validators.required]),
  preg33: new FormControl(null,[Validators.required]) 
  
  


});


  }
  changedPerNeg(j,i){
    this.scrPerNeg[i].value = this.scrPerNeg[i].values[j]
  }

  scrPerNegSend(){
    console.log("form is valid? formScrPerNeg", this.formScrPerNeg.valid);
    if(this.formScrPerNeg.valid){
      console.log("form", this.formScrPerNeg.value);
      //enviar datos a back
      this.instPefNeg.open(1); //aqui ira
    } 
  }

  changedPerMer(j,i){
    this.scrPerMer[i].value = this.scrPerMer[i].values[j]
  }

  scrPerMerSend(){
    console.log("form is valid? formScrPerMer", this.formScrPerMer.valid);
    if(this.formScrPerMer.valid){
      console.log("form", this.formScrPerMer.value);
      //enviar datos a back
      this.instPefNeg.open(2); //aqui ira
    } 
  }

  changedRep(j,i){
    this.scrRep[i].value = this.scrRep[i].values[j]
  }

  scrRepSend(){
    console.log("form is valid? formScrRep", this.formScrRep.valid);
    if(this.formScrRep.valid){
      console.log("form", this.formScrRep.value);
      //enviar datos a back
      this.instPefNeg.open(3); //aqui ira
    } 
  }

  changedDir(j,i){
    this.scrDir[i].value = this.scrDir[i].values[j]
  }

  scrDirSend(){
    console.log("form is valid? formScrDir", this.formScrDir.valid);
    if(this.formScrDir.valid){
      console.log("form", this.formScrDir.value);
      //enviar datos a back
      this.prins.open(1); //aqui ira
    } 
  }

  changedqcQc(j,i){
    this.qcQc[i].value = this.qcQc[i].value[j]
  }

  qcQcSend(){
    console.log("form is valid? formQcQc", this.formQcQc.valid);
    if(this.formQcQc.valid){
      console.log("form", this.formQcQc.value);
      //enviar datos a back
      this.instQrmCnct.open(1); //aqui ira
    }

  }

  qcQcnSend(){
    console.log("formQcQcn", this.formQcQcn.valid);
    console.log("form", this.formQcQcn.value);
    if(this.formQcQcn.valid){
      console.log("form", this.formQcQcn.value);
      //enviar datos a back
    }

  }

  b5(){
    console.log("Reviso valor de check", this.sfina5);
    if(this.sfina5){
      this.formQcQcn.get("qcQcnr05").setValue(" ")
    }
 

  }
  b6(){
    console.log("Reviso valor de check", this.sfina6);
    if(this.sfina6){
      this.formQcQcn.get("qcQcnr06").setValue(" ")
    }
 
  }
  b7(){
    console.log("Reviso valor de check", this.sfina7);
    if(this.sfina7){
      this.formQcQcn.get("qcQcnr07").setValue(" ")
    }
  
  }
  monto(){
    console.log("Reviso valor de check", this.sfina8);
    if(this.sfina8){
      this.formQcQcn.get("qcqcnmo").setValue(" ")
    }
   
  }

  sendQuestions() {
    console.log(this.formScrPerNeg.valid,this.formScrPerMer.valid,this.formScrRep.valid,this.formScrDir.valid,this.formQcQc.valid,this.formQcQcn.valid)
    if((this.formScrPerNeg.valid) && (this.formScrPerMer.valid)
       && (this.formScrRep.valid) && (this.formScrDir.valid)
       && (this.formQcQc.valid) && (this.formQcQcn.valid))
       {
 
    const questionForm = {
      questions: true,
      
      scrPerNeg: this.scrPerNeg,
      scrPerMer: this.scrPerMer,
      scrRep: this.scrRep,
      scrDir: this.scrDir, 
      //Queremos conocerte
      qcQc: this.qcQc,
      qcQc1: this.qcQc1,
      //Queremos conocer tu negocio 
      preg1: this.preg1,
      preg3: this.preg3,
      preg4a5: this.preg4a5,
      preg6a11: this.preg6a11,
      preg12a13: this.preg12a13,
      preg14: this.preg14,
      preg19a28: this.preg19a28,
      preg29: this.preg29,
      preg30:this.preg30,
      preg31:this.preg31,
      preg32:this.preg32,
      preg33: this.preg33,
     
    }
    window.parent.postMessage(questionForm, '*');
  }
  
  else{
    swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
    this.instQrmCnct.open(1); // no ira aqui solo para no completar form
  }
}




}
