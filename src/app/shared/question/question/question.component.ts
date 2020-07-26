import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/service.index';

import * as _ from 'underscore';

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

  scrPerNeg = [
    {
      dataCode: "antiguedad_de_negocio",
      columnId: "campo_1",
      question: "",
      options: [],
      value_quest: "0.2"
    },
    {
      dataCode: "tipo_de_negocio",
      columnId: "campo_2",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "principalmente_a_que_plazo_se_pagan_las_compras",
      columnId: "campo_3",
      question: "",
      options: [],
      value_quest: "0.2"
    },
    {
      dataCode: "principalmente_a_que_plazo_se_pagan_las_ventas",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.2"
    },
    {
      dataCode: "normalmente_como_compone_el_inventario_de_negoci",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "desde_hace_cuanto_tiempo_el_negocio_es_formal",
      columnId: "campo_5",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "seleccione_la_opcion_que_describa_mejor_a_los_pr",
      columnId: "campo_6",
      question: "",
      options: [],
      value_quest: "0.1"
    }
  ];

  /* Perfil de mercado */

  scrPerMer = [
    {
      dataCode: "el_negocio_ofrece_varios_productos_o_servicios",
      columnId: "campo_1",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "el_producto_o_servicio_es_de_temporada_o_se_ofre",
      columnId: "campo_2",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "como_es_la_fuente_principal_de_suministros_del_n",
      columnId: "campo_3",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "numero_de_proveedores",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "seleccione_la_opcion_que_describa_mejor_las_vent",
      columnId: "campo_5",
      question: "",
      options: [],
      value_quest: "0.05"
    },
    {
      dataCode: "los_precios_de_los_productos_o_servicios_que_ofr",
      columnId: "campo_6",
      question: "",
      options: [],
      value_quest: "0.05"
    },
    {
      dataCode: "cuantos_competidores_tiene_el_negocio",
      columnId: "campo_7",
      question: "",
      options: [],
      value_quest: "0.05"
    },
    {
      dataCode: "que_tan_probable_es_que_el_producto_o_servicio_q",
      columnId: "campo_8",
      question: "",
      options: [],
      value_quest: "0.05"
    },
    {
      dataCode: "seleccione_la_opcion_que_describa_mejor_el_secto",
      columnId: "campo_9",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "normalmente_el_negocio_depende_de_apoyos_del_gob",
      columnId: "campo_10",
      question: "",
      options: [],
      value_quest: "0.2"
    },
    {
      dataCode: "considera_que_la_regulacion_limita_el_negocio",
      columnId: "campo_11",
      question: "",
      options: [],
      value_quest: "0.1"
    }
  ];

  /* Reputación */

  scrRep = [
    {
      dataCode: "como_es_la_reputacion_del_negocio_con_los_client",
      columnId: "campo_1",
      question: "",
      options: [],
      value_quest: "0.13"
    },
    {
      dataCode: "como_es_la_reputacion_del_negocio_con_los_provee",
      columnId: "campo_2",
      question: "",
      options: [],
      value_quest: "0.13"
    },
    {
      dataCode: "hace_cuanto_tiempo_tienen_los_duenos_del_negocio",
      columnId: "campo_3",
      question: "",
      options: [],
      value_quest: "0.15"
    },
    {
      dataCode: "selecciona_la_opcion_que_describa_mejor_la_relac",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.3"
    },
    {
      dataCode: "como_calificaria_el_historial_de_credito_de_los_",
      columnId: "campo_5",
      question: "",
      options: [],
      value_quest: "0.15"
    },
    {
      dataCode: "los_duenos_tienen_juicios_en_contra_o_asuntos_le",
      columnId: "campo_6",
      question: "",
      options: [],
      value_quest: "0.14"
    }
  ];

  /* Dirección */
  scrDir = [
    {
      dataCode: "cuantos_anos_de_experiencia_en_el_negocio_tienen",
      columnId: "campo_1",
      question: "",
      options: [],
      value_quest: "0.35"
    },
    {
      dataCode: "cual_es_la_escolaridad_de_la_persona_que",
      columnId: "campo_2",
      question: "",
      options: [],
      value_quest: "0.15"
    },
    {
      dataCode: "cual_es_el_rango_de_edad_de_la_persona_que_dirig",
      columnId: "campo_3",
      question: "",
      options: [],
      value_quest: "0.20"
    },
    {
      dataCode: "el_negocio_tiene_un_plan_de_sucesion_para_que_ot",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.3"
    } 
  ];

  /* Queremos conocerte */

  qcQc = [
    {
      dataCode: "estado_civil",
      columnId: "campo_1",
      question: "",
      options: []
    },
    {
      dataCode: "nivel_de_estudios_del_solicitante",
      columnId: "campo_2",
      question: "",
      options: []
    },
    {
      dataCode: "habla_usted_alguna_lengua_indigena",
      columnId: "campo_3",
      question: "",
      options: []
    },
    {
      dataCode: "en_su_vida_diaria_tiene_dificultad_al_realizar_l",
      columnId: "campo_4",
      question: "",
      options: []
    },
    {
      dataCode: "usa_usted_internet_habitualmente",
      columnId: "campo_5",
      question: "",
      options: []
    },
    {
      dataCode: "cual_es_su_papel_en_el_hogar",
      columnId: "campo_6",
      question: "",
      options: []
    },
    {
      dataCode: "su_vivienda_es",
      columnId: "campo_7",
      question: "",
      options: []
    }
  ];

  qcQc1 = [
    {
      quest: "Número de dependientes económicos",
      opts: [""],
      resp: "",
      value: ""
    }
  ];

  /* Queremos conocer tu negocio */
  preg1 = [
    {
      quest: "¿Fecha en que inició su actividad productiva?",
      opts: [""],
      resp: "",
      value: ""
    }];

  preg2 = [
    {
      quest: "Registre el total de ingresos que obtuvo el negocio durante el ejercicio fiscal anterior. Por favor incluya tanto los ingresos derivados como los no derivados de la actividad, además de los apoyos del gobierno que haya recibido",
      opts: ["No sé", "Si sé, pero prefiero no  declararlo"],
      resp: "",
      value: ""
    }];

  preg2m = [
    {
      quest: "Monto",
      opts: [""],
      resp: "",
      value: ""
    }];


  preg3 = [
    {
      quest: "¿Cuántas personas trabajan en su negocio?",
      opts: [""],
      resp: "",
      value: ""
    }];

  preg4a5 = [
    {
      quest: "¿Cuál es el destino del crédito; es decir, específicamente para qué va a usar el crédito en su negocio? Por ejemplo, comprar un vehículo para repartir a domicilio.",
      opts: [""],
      resp: "",
      value: ""
    },

    {
      quest: "¿Cuál es el propósito del proyecto; es decir, en qué espera que mejore su negocio debido al crédito que solicita? Por ejemplo, incrementar las ventas con la entrega a domicilio.",
      opts: [""],
      resp: "",
      value: ""
    }];

  preg6a11 = [

    {
      quest: "¿De cuánto efectivo dispone actualmente para cubrir las operaciones del negocios? Incluya lo que guarda en su casa, en el banco o en el negocio.",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "¿Al día de hoy cuánto le deben por venta de bienes a crédito o servicios realizados y que aún no le hayan terminado de pagar? ",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "¿Cuánto obtendría si vendiera el material de oficina, la maquinaria que usa en su negocio, aparatos de su propiedad o el local del negocio en caso de que sea suyo?",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Pensando en los últimos 6 meses, en promedio, ¿cuánto vende o ingresa por la realización de sus servicios cada mes sin descontar los gastos?",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Pensando en los últimos 6 meses, en promedio, ¿a cuánto ascienden, cada mes,  otros ingresos obtenidos además de los generados por su actividad principal del negocio?",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "En promedio ¿cuánto gasta cada vez que surte su negocio con mercancías para la venta de bienes o realización de sus servicios?",
      opts: [""],
      resp: "",
      value: ""
    }];

  preg12a13 = [
    {
      quest: "¿Con qué frecuencia surte su negocio con mercancías o materias primas para la venta de bienes o la prestación de sus servicios?",
      opts: ["Diariamente", "Cada semana", "Cada quincena", "Cada mes", "Cada 2 meses", "Cada 3 meses", "Cada 4 meses", "Cada 6 meses", "Cada año"],
      resp: "",
      value: ""
    },
    {
      quest: "¿Cuándo fue la última vez que surtió su negocio con mercancías o materias primas para la venta de bienes o prestación de sus servicios?",
      opts: ["Ayer", "Hace una semana", "Hace dos semanas", "Hace un mes", "Hace 2 meses", "Hace 3 meses", "Hace 4 meses", "Hace 5 meses", "Hace 6 meses", "Hace 1 año", "Hace más de un año"],
      resp: "",
      value: ""
    }];

  preg14 = [
    {
      quest: "Sueldos, salarios o cualquier otro pago a los trabajadores del negocio",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Renta de locales o espacios comerciales",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Servicios públicos",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Transporte para actividades del negocio",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Pago por franquicias",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Promoción y publicidad",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Pago de servicios contables o legales",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Mantenimiento del negocio",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Licencias de software",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Impuestos",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Otros gastos no incluidos en la lista pero que son necesarios para la operación de su negocio",
      opts: [""],
      resp: "",
      value: ""
    }

  ];

  preg15r = [
    {
      quest: "No cuento con ningún financiamiento.",
      opts: [""],
      resp: "",
      value: ""
    }];

  preg15 = [
    {
      quest: "Recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Préstamos de familiares y amigos que no tienen participación en la empresa. ",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Sistema ﬁnanciero formal (bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Prestamistas particulares (personas que prestan dinero)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Crédito de proveedores",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Recursos de inversionistas privados",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Otras",
      opts: [""],
      resp: "",
      value: ""
    }

  ];

  preg16r = [
    {
      quest: "No cuento con ningún financiamiento.",
      opts: [""],
      resp: "",
      value: ""
    }];

  preg16 = [
    {
      quest: "Recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Préstamos de familiares y amigos que no tienen participación en la empresa",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Sistema ﬁnanciero formal (bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Prestamistas particulares (personas que prestan dinero)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Crédito de proveedores ",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Recursos de inversionistas privados",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Otras",
      opts: [""],
      resp: "",
      value: ""
    }
  ];

  preg17r = [
    {
      quest: "No cuento con ningún financiamiento.",
      opts: [""],
      resp: "",
      value: ""
    }];

  preg17 = [
    {
      quest: "Préstamos de familiares y amigos que no tienen participación en la empresa",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Sistema ﬁnanciero formal (bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Prestamistas particulares (personas que prestan dinero)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Crédito de proveedores",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Recursos de inversionistas privados",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Otras",
      opts: [""],
      resp: "",
      value: ""
    }
  ];

  preg18 = [
    {
      quest: "Luz",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Gas o algún combustible",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Telecomunicaciones (teléfono fijo o celular para el negocio e internet)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Materias primas consumidas (a costo de adquisición)",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Mercancías compradas para reventa",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Materiales consumidos para la prestación del servicio",
      opts: [""],
      resp: "",
      value: ""
    },
    {
      quest: "Otros",
      opts: [""],
      resp: "",
      value: ""
    }
  ];

  preg19a28 = [
    {
      quest: "¿Participó en la convocatoria 2.1 Desarrollo y Fortalecimiento Empresarial de la SE?",
      opts: ["Sí", "No"],
      resp: "",
      value: ""
    },
    {
      quest: "¿Recibió capacitación vinculada a su crédito proveniente de alguna organización?",
      opts: ["Sí", "No"],
      resp: "",
      value: ""
    },
    {
      quest: "¿Ha solicitado crédito anteriormente?",
      opts: ["Sí", "No"],
      resp: "",
      value: ""
    },
    {
      quest: "¿Sus ingresos han mejorado después de recibir un crédito?",
      opts: ["Sí", "No", "No aplica"],
      resp: "",
      value: ""
    },
    {
      quest: "Además de su oficina, comercio, o local principal, ¿tiene otra(s) oficina(s), comercio(s), local(es) o sucursal(es)?",
      opts: ["Sí", "No"],
      resp: "",
      value: ""
    },
    {
      quest: "¿Cómo se lleva la contabilidad de la empresa?",
      opts: ["Se utiliza un cuaderno o una libreta de apuntes para llevar la contabilidad", "Se utiliza los servicios de un contador o profesional para llevar la contabilidad", "Se utiliza el “Portal Mis Cuentas” del SAT", "Se utiliza un paquete de contabilidad por parte de la empresa", "No se lleva la contabilidad de la empresa", "Otro"],
      resp: "",
      value: ""
    },
    {
      quest: "¿La empresa tiene cuenta bancaria exclusiva para el manejo del dinero del negocio?",
      opts: ["Sí", "No"],
      resp: "",
      value: ""
    },
    {
      quest: "Durante el ejercicio fiscal anterior, ¿la empresa tuvo necesidad de invertir en equipo, vehículos, inmuebles, capacitación, etcétera y no pudo por falta de dinero?",
      opts: ["Sí", "No"],
      resp: "",
      value: ""
    },
    {
      quest: "¿Durante el ejercicio fiscal anterior se otorgó capacitación al personal de la empresa (usando capacitadores internos o externos)?",
      opts: ["Sí", "No"],
      resp: "",
      value: ""
    },
    {
      quest: "¿Cuál fue la principal causa por la que durante el ejercicio fiscal anterior no se otorgó capacitación al personal de la empresa?",
      opts: ["Capacitar interrumpe la producción", "Capacitar hace que el personal demande un salario mayor, busque otro trabajo o se independice", "No se encontró capacitador conforme a las necesidades de la empresa", "Se tenía la intención de capacitar pero es muy caro", "Se consideró que el conocimiento y las habilidades técnicas del personal son adecuadas", "No vale la pena porque la empresa tiene muy alta rotación de personal", "En años previos se impartió la capacitación necesaria", "Se solicitó la capacitación a instituciones públicas, pero no se pudo obtener", "No hay beneﬁcios palpables como resultado de la capacitación", "Se utiliza gente externa que ya viene capacitada", "El horario de la empresa no lo permite", "Otra"],
      resp: "",
      value: ""
    }];

  preg29 = [
    {
      quest: "¿En la empresa se realizan actualmente algunas de las siguientes actividades? (seleccionar una o más de las siguientes opciones)",
      opts: ["Se lleva registros escritos del negocio. Es decir, se tiene un lugar, cuaderno, archivo o computadora donde se concentra la información de las operaciones diarias del negocio", "Se sabe cuánto dinero en efectivo tiene el negocio en un momento determinado", "Se sabe si las ventas de un producto (bien o servicio) en particular están subiendo o bajando de un mes a otro", "Se sabe cuánto le cuesta al negocio generar cada uno de sus principales productos (bienes o servicios). Por ejemplo, si tiene que calcular cuánto le cuesta producir una galleta, se hacen las cuentas de cuánto gasta en comprar harina, azúcar, leche, luz para usar la batidora, gas para el horno, renta del local, etcétera; otro ejemplo: si se ofrece un servicio de transporte, se hacen las cuentas de cuánto se gasta en el consumo de gasolina, casetas de peaje, etcétera", "Se sabe de qué productos (bienes o servicios) se obtienen más ganancias por cada uno que vende", "El negocio no lleva registros y no cuenta con información que permita conocer a detalle su operación"],
      resp: "",
      value: ""
    }];

  preg30 = [
    {
      quest: "¿Cuál es el motivo principal por el que se inició en este negocio o actividad? (Seleccionar una o varias opciones)",
      opts: ["Por tradición familiar o lo heredó", "Para complementar el ingreso familiar", "Para mejorar el ingreso", "Tenía dinero y encontró una buena oportuindad", "Para ejercer su oficio, carrera o profesión", "Fue la única manera que tuvo para obtener un ingreso", "No tenía la experiencia requerida para un empleo", "No tenía la escolaridad o capacitación requerida para un empleo", "Estaba sobrecapacitado para un empleo", "Los empleos que encontró estaban mal pagados", "Requería un horario flexible", "No había oportunidades de empleo", "Otra razón"],
      resp: "",
      value: ""
    }];

  preg31 = [
    {
      quest: "En su negocio o actividad, ¿cuenta con un local para trabajar sea o no de su propiedad? (Seleccione una opción o más de una si tiene varios locales)",
      opts: ["Sí, es un local independiente", "Sí, es un local o instalación que forma parte de un conjunto de locales", "No"],
      resp: "",
      value: ""
    }];

  preg32 = [
    {
      quest: "En caso de ser local independiente (fuera de un techo común), ¿éste es? (Seleccionar una o varias opciones)",
      opts: ["Tienda, accesoria o tendajón", "Taller (de servicios o de reparación)", "Fábrica, tortillería, panadería", "Oficina, despacho, consultorio"],
      resp: "",
      value: ""
    }];

  preg33 = [
    {
      quest: "Si no cuenta con un local, ¿en dónde se realizan las actividades de su negocio? (Seleccionar una o varias opciones)",
      opts: ["Vehículo con o sin motor", "Puesto fijo fuera de un techo común", "Puesto semifijo bajo un techo común en pasillos de un centro comercial", "Puesto semifijo en un tianguis", "En un domicilio particular con una instalación especial", "En un domicilio particular sin una instalación especial", "Otro lugar"],
      resp: "",
      value: ""
    }];

  formScrPerNeg: FormGroup;
  formScrPerMer: FormGroup;
  formScrRep: FormGroup;
  formScrDir: FormGroup;
  formQcQc: FormGroup;
  formQcQcn: FormGroup;
  instPefNeg;
  instQrmCnct;
  prins;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
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
      qcQc1: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(38)]),
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
      preg3: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
      preg4a50: new FormControl(null, [Validators.required]),
      preg4a51: new FormControl(null, [Validators.required]),
      preg6a110: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg6a111: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg6a112: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg6a113: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg6a114: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg6a115: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg12a130: new FormControl(null, [Validators.required]),
      preg12a131: new FormControl(null, [Validators.required]),
      preg140: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg141: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg142: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg143: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg144: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg145: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg146: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg147: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg148: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg149: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg1410: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),

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
      preg180: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg181: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg182: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg183: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg184: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg185: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
      preg186: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
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
      preg29: new FormControl(null, [Validators.required]),
      preg30: new FormControl(null, [Validators.required]),
      preg31: new FormControl(null, [Validators.required]),
      preg32: new FormControl(null, [Validators.required]),
      preg33: new FormControl(null, [Validators.required])
    });
  
    // Read DataCodes Values
    // Cuestionario Direccion
    let preConf = this.scrDir;
    let questions:any = []; 
    preConf.forEach(function (element) {
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          var options = [];
          _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
            options.push({id: codeValue.id, name: codeValue.name, score: codeValue.score, position: codeValue.position});
          });
          element.options = options;
        },
        error => {
          console.error('There was an error getting code values ' + element.dataCode, error);
        }
      );
      questions.push(element);
    }, this);
    this.scrDir = questions;
    // Cuestionario Direccion -- Fin

    // Cuestionario Reputacion
    // Cuestionario Reputacion -- Fin


  }

  changedPerNeg(j, i) {
    //this.scrPerNeg[i].value = this.scrPerNeg[i].values[j]
  }

  scrPerNegSend() {
    // console.log("form is valid? formScrPerNeg", this.formScrPerNeg.valid);
    if (this.formScrPerNeg.valid) {
      // console.log("form", this.formScrPerNeg.value);
      //enviar datos a back
      this.instPefNeg.open(1); //aqui ira
    }
  }

  changedPerMer(j, i) {
    //this.scrPerMer[i].value = this.scrPerMer[i].values[j]
  }

  scrPerMerSend() {
    // console.log("form is valid? formScrPerMer", this.formScrPerMer.valid);
    if (this.formScrPerMer.valid) {
      // console.log("form", this.formScrPerMer.value);
      //enviar datos a back
      this.instPefNeg.open(2); //aqui ira
    }
  }

  changedRep(j, i) {
    //this.scrRep[i].value = this.scrRep[i].values[j]
  }

  scrRepSend() {
    // console.log("form is valid? formScrRep", this.formScrRep.valid);
    if (this.formScrRep.valid) {
      // console.log("form", this.formScrRep.value);
      //enviar datos a back
      this.instPefNeg.open(3); //aqui ira
    }
  }

  changedDir(j, i) {
    // this.scrDir[i].score = this.scrDir[i].score[j]
  }

  scrDirSend() {
    // console.log("form is valid? formScrDir", this.formScrDir.valid);
    if (this.formScrDir.valid) {
      // console.log("form", this.formScrDir.value);
      //enviar datos a back
      this.prins.open(1); //aqui ira
    }
  }

  changedqcQc(j, i) {
    //this.qcQc[i].value = this.qcQc[i].value[j]
  }

  qcQcSend() {
    // console.log("form is valid? formQcQc", this.formQcQc.valid);
    if (this.formQcQc.valid) {
      // console.log("form", this.formQcQc.value);
      //enviar datos a back
      this.instQrmCnct.open(1); //aqui ira
    }
  }

  qcQcnSend() {
    // console.log("formQcQcn", this.formQcQcn.valid);
    // console.log("form", this.formQcQcn.value);
    if (this.formQcQcn.valid) {
      // console.log("form", this.formQcQcn.value);
      //enviar datos a back
    }
  }

  b5() {
    // console.log("Reviso valor de check", this.sfina5);
    if (this.sfina5) {
      this.formQcQcn.get("qcQcnr05").setValue(" ")
    }
  }

  b6() {
    // console.log("Reviso valor de check", this.sfina6);
    if (this.sfina6) {
      this.formQcQcn.get("qcQcnr06").setValue(" ")
    }
  }

  b7() {
    // console.log("Reviso valor de check", this.sfina7);
    if (this.sfina7) {
      this.formQcQcn.get("qcQcnr07").setValue(" ")
    }
  }

  monto() {
    // console.log("Reviso valor de check", this.sfina8);
    if (this.sfina8) {
      this.formQcQcn.get("qcqcnmo").setValue(" ")
    }
  }

  sendQuestions() {
    // console.log(this.formScrPerNeg.valid,this.formScrPerMer.valid,this.formScrRep.valid,this.formScrDir.valid,this.formQcQc.valid,this.formQcQcn.valid)
    /* if (this.formScrPerNeg.valid){ */
    if ((this.formScrPerNeg.valid) && (this.formScrPerMer.valid)
      && (this.formScrRep.valid) && (this.formScrDir.valid)
      && (this.formQcQc.valid) && (this.formQcQcn.valid)) {
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
        preg30: this.preg30,
        preg31: this.preg31,
        preg32: this.preg32,
        preg33: this.preg33,

      }
      window.parent.postMessage(questionForm, '*');
    }

    else {
      swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
      //this.instQrmCnct.open(1); // no ira aqui solo para no completar form
    }
  }
}
