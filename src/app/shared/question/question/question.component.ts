import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/service.index';
import { QuestionsService } from '../../../services/service.index';

import * as _ from 'underscore';

declare const MStepper: any;
import * as M from 'materialize-css';
import swal from 'sweetalert';
import { element } from 'protractor';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  calendar;
  sfina5 = 'NO CUENTO CON NINGÚN FINANCIAMIENTO';
  sfina6 = 'NO CUENTO CON NINGÚN FINANCIAMIENTO';
  sfina7 = 'NO CUENTO CON NINGÚN FINANCIAMIENTO';
  sfina2 = 'NO SÉ'
  
  
  

  /* Perfil de negocio */

  scrPerNeg = [
    {
      dataCode: "antiguedad_del_negocio",
      columnId: "campo_1",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.2"
    },
    {
      dataCode: "tipo_de_negocio",
      columnId: "campo_2",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "principalmente_a_que_plazo_se_pagan_las_compras",
      columnId: "campo_3",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.2"
    },
    {
      dataCode: "principalmente_a_que_plazo_se_cobran_las_ventas",
      columnId: "campo_4",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.2"
    },
    {
      dataCode: "normalmente_como_se_compone_el_inventario_del_ne",
      columnId: "campo_5",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "desde_hace_cuento_tiempo_el_negocio_es_formal",
      columnId: "campo_6",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "seleccione_la_opcion_que_describa_mejor_a_los_pr",
      columnId: "campo_7",
      question: "",
      options: [],
      resp: "",
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
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "el_producto_o_servicio_es_de_temporada_o_se_ofre",
      columnId: "campo_2",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "como_es_la_fuente_principal_de_suministros_del_n",
      columnId: "campo_3",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "numero_de_proveedores",
      columnId: "campo_4",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "seleccione_la_opcion_que_describa_mejor_las_vent",
      columnId: "campo_5",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.05"
    },
    {
      dataCode: "los_precios_de_los_productos_o_servicios_que_ofr",
      columnId: "campo_6",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.05"
    },
    {
      dataCode: "cuantos_competidores_tiene_el_negocio",
      columnId: "campo_7",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.05"
    },
    {
      dataCode: "que_tan_probable_es_que_el_producto_o_servicio_q",
      columnId: "campo_8",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.05"
    },
    {
      dataCode: "seleccione_la_opcion_que_describa_mejor_el_secto",
      columnId: "campo_9",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.1"
    },
    {
      dataCode: "normalmente_el_negocio_depende_de_apoyos_del_gob",
      columnId: "campo_10",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.2"
    },
    {
      dataCode: "considera_que_la_regulacion_limita_el_negocio",
      columnId: "campo_11",
      question: "",
      options: [],
      resp: "",
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
      resp: "",
      value_quest: "0.13"
    },
    {
      dataCode: "como_es_la_reputacion_del_negocio_con_los_provee",
      columnId: "campo_2",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.13"
    },
    {
      dataCode: "hace_cuanto_tiempo_tienen_los_duenos_del_negocio",
      columnId: "campo_3",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.15"
    },
    {
      dataCode: "seleccione_la_opcion_que_describa_mejor_la_relac",
      columnId: "campo_4",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.3"
    },
    {
      dataCode: "como_calificaria_el_historial_de_credito_de",
      columnId: "campo_5",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.15"
    },
    {
      dataCode: "los_duenos_tienen_juicios_en_contra_o_asuntos_le",
      columnId: "campo_6",
      question: "",
      options: [],
      resp: "",
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
      resp: "",
      value_quest: "0.35"
    },
    {
      dataCode: "cual_es_la_escolaridad_de_la_persona_que",
      columnId: "campo_2",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.15"
    },
    {
      dataCode: "cual_es_el_rango_de_edad_de_la_persona_que_dirig",
      columnId: "campo_3",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.20"
    },
    {
      dataCode: "el_negocio_tiene_un_plan_de_sucesion_para_que_ot",
      columnId: "campo_4",
      question: "",
      options: [],
      resp: "",
      value_quest: "0.3"
    } 
  ];

  /* Queremos conocerte */

  qcQc = [
    {
      dataCode: "MARITAL_STATUS",
      columnId: "campo_1",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "nivel_de_estudios_del_solicitante",
      columnId: "campo_2",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "habla_usted_alguna_lengua_indigena",
      columnId: "campo_3",
      question: "",
      resp: "",
      options: []
    }];

    qcQc01 = [
    {
      dataCode: "",
      columnId: "campo_4",
      question: "En su vida diaria, ¿tiene dificultad al realizar las siguientes actividades? (Seleccionar una o varias opciones)*",
      resp: "",
      options: []
    }];

    qcQc02 =[
    {
      dataCode: "usa_usted_internet_habitualmente",
      columnId: "campo_5",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "cual_es_su_papel_en_el_hogar",
      columnId: "campo_6",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "ADDRESS_TYPE",
      columnId: "campo_7",
      question: "",
      resp: "",
      options: []
    }
  ];

  qcQc10 = [
    {
      //dataCode: "",
      columnId: "campo_8",
      question: "¿Número de dependientes economicos? *",
      resp: "",
      options: []
    }
  ];

  /* Queremos conocer tu negocio */
  preg1 = [
    {
      dataCode: "",
      columnId: "campo_1",
      question: "Fecha en que inició su actividad productiva. *",
      resp: "",
      options: []
    }];

    preg2 = [
    {
      dataCode: "",
      columnId: "campo_3",
      question: "Registre el total de ingresos que obtuvo el negocio durante el ejercicio fiscal anterior. Por favor, incluya tanto los ingresos derivados como los no derivados de la actividad, además de los apoyos del gobierno que haya recibido.*",
      resp: "",
      options: []
    }];

  preg3 = [
    {
      dataCode: "",
      columnId: "campo_4",
      question: "¿Cuántas personas trabajan en su negocio? *",
      resp: "",
      options: []
    }];

  preg4a5 = [
    {
      dataCode: "",
      columnId: "campo_5",
      question: "¿Cuál es el destino del crédito; es decir, específicamente para qué va a usar el crédito en su negocio? Por ejemplo, comprar un vehículo para repartir a domicilio.*",
      resp: "",
      options: []
    },

    {
      dataCode: "",
      columnId: "campo_6",
      question: "¿Cuál es el propósito del proyecto; es decir, en qué espera que mejore su negocio debido al crédito que solicita? Por ejemplo, incrementar las ventas con la entrega a domicilio. *",
      resp: "",
      options: []
    }];

    preg6a11 = [

      {
        dataCode: "",
        columnId: "campo_7",
        question: "¿De cuánto efectivo dispone actualmente para cubrir las operaciones del negocios? Incluya lo que guarda en su casa, en el banco o en el negocio. *",
        resp: "",
        options: []
      },
      {
        dataCode: "",
        columnId: "campo_8",
        question: "¿Al día de hoy cuánto le deben por venta de bienes a crédito o servicios realizados y que aún no le hayan terminado de pagar? *",
        resp: "",
        options: []
      },
      {
        dataCode: "",
        columnId: "campo_9",
        question: "Cuánto obtendría si vendiera el material de oficina, la maquinaria que usa en su negocio, aparatos de su propiedad o el local del negocio en caso de que sea suyo? *",
        options: []
      },
      {
        dataCode: "",
        columnId: "campo_10",
        question: "Pensando en los últimos 6 meses, en promedio, ¿cuánto vende o ingresa por la realización de sus servicios cada mes sin descontar los gastos? *",
        resp: "",
        options: []
      },
      {
        dataCode: "",
        columnId: "campo_11",
        question: "Pensando en los últimos 6 meses, en promedio, ¿a cuánto ascienden, cada mes, otros ingresos obtenidos además de los generados por su actividad principal del negocio? *",
        resp: "",
        options: [] 
      },
      {
        dataCode: "",
        columnId: "campo_12",
        question: "En promedio ¿cuánto gasta cada vez que surte su negocio con mercancías para la venta de bienes o realización de sus servicios? *",
        resp: "",
        options: []
      }
    ];

  preg12a13 = [
    {
      dataCode: "con_que_frecuencia_surte_su_negocio_con_mercanci",
      columnId: "campo_13",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "cuando_fue_la_ultima_vez_que_surtio_su_negocio_c",
      columnId: "campo_14",
      question: "",
      resp: "",
      options: []
    }];

  preg14 = [
    {
      dataCode: "",
      columnId: "campo_15",
      question: "¿Pensando en los últimos 6 meses, en promedio, indique cuánto paga cada mes por: Sueldos, salarios o cualquier otro pago a los trabajadores del negocio? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_16",
      question: "¿Renta de locales o espacios comerciales? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_17",
      question: "¿Servicios públicos? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_18",
      question: "¿Transporte para actividades del negocio? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_19",
      question: "¿Pago por franquicias? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_20",
      question: "¿Promoción y publicidad? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_21",
      question: "¿Servicios contables o legales? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_22",
      question: "¿Mantenimiento del negocio? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_23",
      question: "¿Licencias de software? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_24",
      question: "¿Impuestos? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_25",
      question: "¿Otros gastos no incluidos en la lista pero que son necesarios para la operación de su negocio? *",
      resp: "",
      options: []
    }
  ];

  preg15 = [
    {
      dataCode: "",
      columnId: "campo_26",
      question: "¿Indique el monto de financiamiento que haya recibido de cada una de las fuentes siguientes durante el ejercicio fiscal anterior o indique si no contó con alguno? *",
      resp: "",
      options: []
    }
  ];

  preg15_0 = [
    {
      dataCode: "",
      columnId: "campo_27",
      question: "¿Monto por Recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_28",
      question: "¿Monto por Préstamos de familiares y amigos que no tienen participación en la empresa?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_29",
      question: "¿Monto por Sistema ﬁnanciero formal ( bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_30",
      question: "¿Monto por Prestamistas particulares (personas que prestan dinero)?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_31",
      question: "¿Monto por Crédito de proveedores?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_32",
      question: "¿Monto por Recursos de inversionistas privados?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_33",
      question: "¿Monto por Otras?",
      resp: "",
      options: []
    }
  ];

  preg16 = [
    {
      dataCode: "",
      columnId: "campo_34",
      question: "¿Cuánto debe al día de hoy por los conceptos siguientes o indique si no contó con alguno? *",
      resp: "",
      options: []
    }
  ];

  preg16_0 = [
    {
      dataCode: "",
      columnId: "campo_35",
      question: "¿Monto por recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas? ",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_36",
      question: "¿Monto por préstamos de familiares y amigos que no tienen participación en la empresa?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_37",
      question: "¿Monto por sistema ﬁnanciero formal ( bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_38",
      question: "¿Monto por Prestamistas particulares (personas que prestan dinero)?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_39",
      question: "¿Monto por crédito de proveedores?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_40",
      question: "¿Monto por recursos de inversionistas privados?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_41",
      question: "¿Monto por otras?",
      resp: "",
      options: []
    }
  ];

  preg17 = [
    {
      dataCode: "",
      columnId: "campo_42",
      question: "En promedio, ¿cuánto paga cada mes por los conceptos siguientes o indique si no contó con alguno? *",
      resp: "",
      options: []
    }
  ];

  preg17_0 = [
    {
      dataCode: "",
      columnId: "campo_43",
      question: "¿Monto por préstamos de familiares y amigos que no tienen participación en la empresa?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_44",
      question: "¿Monto por sistema ﬁnanciero formal ( bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_45",
      question: "¿Monto por prestamistas particulares (personas que prestan dinero)?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_46",
      question: "¿Monto por crédito de proveedores?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_47",
      question: "¿Monto por recursos de inversionistas privados?",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_48",
      question: "¿Monto por otras?",
      resp: "",
      options: []
    }
  ];

  preg18 = [
    {
      dataCode: "",
      columnId: "campo_49",
      question: "¿Registre la cantidad que pagó la empresa por los siguientes conceptos durante el ejercicio fiscal anterior: Luz? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_50",
      question: "¿Gas o algún combustible? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_51",
      question: "¿Telecomunicaciones (teléfono fijo o celular para el negocio e internet)? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_52",
      question: "¿Materias primas consumidas (a costo de adquisición)? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_53",
      question: "¿Mercancías compradas para reventa? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_54",
      question: "¿Materiales consumidos para la prestación del servicio? *",
      resp: "",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_55",
      question: "¿Otros? *",
      resp: "",
      options: []
    }
  ];

  preg19a28 = [
    {
      dataCode: "participo_en_la_convocatoria_2_1_desarrollo_y_fo",
      columnId: "campo_56",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "recibio_capacitacion_vinculada_a_su_credito_prov",
      columnId: "campo_57",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "ha_solicitado_credito_anteriormente",
      columnId: "campo_58",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "sus_ingresos_han_mejorado_despues_de_recibir_un",
      columnId: "campo_59",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "ademas_de_su_oficina_comercio_o_local_principal",
      columnId: "campo_60",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "como_se_lleva_la_contabilidad_de_la_empresa",
      columnId: "campo_61",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "la_empresa_tiene_cuenta_bancaria_exclusiva_para",
      columnId: "campo_62",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "durante_el_ejercicio_fiscal_anterior_la_empresa",
      columnId: "campo_63",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "durante_el_ejercicio_fiscal_anterior_se_otorgo_c",
      columnId: "campo_64",
      question: "",
      resp: "",
      options: []
    },
    {
      dataCode: "cual_fue_la_principal_causa_por_la_que_durante_e",
      columnId: "campo_65",
      question: "",
      resp: "",
      options: []
    }];

  
  preg29 = [
    {
      dataCode: "en_la_empresa_se_realizan_actualmente_algunas_de",
      columnId: "campo_66",
      question: "¿En la empresa se realizan actualmente algunas de las siguientes actividades? (seleccionar una o más de las siguientes opciones)*",
      options: [],
      resp: ""
    }];

  preg30 = [
    {
      dataCode: "cual_es_el_motivo_principal_por_el_que_se_inicio",
      columnId: "campo_67",
      question: "¿Cuál es el motivo principal por el que se inició en este negocio o actividad? (Seleccionar una o varias opciones)*",
      resp: "",
      options: []
    }
  ];

  preg31 = [
    {
      dataCode: "en_su_negocio_o_actividad_cuanta_con_un_local_pa",
      columnId: "campo_68",
      question: "En su negocio o actividad, ¿cuenta con un local para trabajar sea o no de su propiedad? (Seleccione una opción o más de una si tiene varios locales)*",
      resp: "",
      options: []
    }];

  preg32 = [
    {
      dataCode: "en_caso_de_ser_local_independiente_fuera_de_un_t",
      columnId: "campo_69",
      question: "En caso de ser local independiente (fuera de un techo común), ¿éste es? (Seleccionar una o varias opciones)*",
      resp: "",
      options: []
    }];

    preg33 =[
    {
      dataCode: "si_no_cuenta_con_un_local_en_donde_se_realizan_l",
      columnId: "campo_70",
      question: "Si no cuenta con un local, ¿en dónde se realizan las actividades de su negocio? (Seleccionar una o varias opciones)*",
      resp: "",
      options: []
    }
  ];

  formScrPerNeg: FormGroup;
  formScrPerMer: FormGroup;
  formScrRep: FormGroup;
  formScrDir: FormGroup;
  formQcQc: FormGroup;
  formQcQcn: FormGroup;
  instPefNeg;
  instQrmCnct;
  prins;
  instance
  base64EncodedAuthenticationKey;
  clientid;
  userid;

  constructor(public userService: UserService, public questionsServices:QuestionsService) {}

  ngOnInit() {
    this.clientid=localStorage.getItem('clientid');
    this.userid=localStorage.getItem('userid');
    this.base64EncodedAuthenticationKey=localStorage.getItem('authkey');

    var elems = document.querySelectorAll('.modal');
    this.instance = M.Modal.init(elems);
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
      qcQc01: new FormControl(null, [Validators.required]),
      qcQc020: new FormControl(null, [Validators.required]),
      qcQc021: new FormControl(null, [Validators.required]),
      qcQc022: new FormControl(null, [Validators.required]),
      qcQc10: new FormControl(null, [Validators.required,Validators.min(0), Validators.max(38)])
    }); 

    this.formQcQcn = new FormGroup({
      preg1: new FormControl(null, [Validators.required]),
      preg2: new FormControl(null,[Validators.required]), 
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
      preg15: new FormControl('', Validators.required),  
      preg15_00: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg15_01: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg15_02: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg15_03: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg15_04: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg15_05: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg15_06: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg16: new FormControl('',[Validators.required]), 
      preg16_00: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg16_01: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg16_02: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg16_03: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg16_04: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg16_05: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg16_06: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg17: new FormControl('',[Validators.required]), 
      preg17_00: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg17_01: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg17_02: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg17_03: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg17_04: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
      preg17_05: new FormControl(null,[Validators.min(0), Validators.max(10000000)]),
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

  
   this.llenaPerfNeg(this.scrPerNeg); 
 
   
   this.llenaquerconocerte0(this.qcQc10); 
   this.llenaqctn1(this.preg1); 
   this.llenaqctn2(this.preg2); 
   this.llenaqctn3(this.preg3); 
   this.llenaqctn4a5(this.preg4a5); 
   this.llenaqctn6a11(this.preg6a11); 
   this.llenaqctn14(this.preg14); 
   this.llenaqctn15(this.preg15); 
   this.llenaqctn15_0(this.preg15_0); 
   this.llenaqctn16(this.preg16); 
   this.llenaqctn16_0(this.preg16_0);
   this.llenaqctn17(this.preg17); 
   this.llenaqctn17_0(this.preg17_0);
   this.llenaqctn18(this.preg18); 
   this.llenaqctn29(this.preg29);
   this.llenaqctn30(this.preg30); 
   this.llenaqctn31(this.preg31);
   this.llenaqctn32(this.preg32);
   this.llenaqctn33(this.preg33);


  }
  
  get f() { return this.formQcQcn.controls; }

  errPerfNeg(dataCode,obj){
    let ver = this[obj].findIndex(x => x.dataCode === dataCode );
    console.log("index de object perfNeg", ver);

    this.userService.getDataCode(dataCode).subscribe(
      data => {
        this[obj][ver].question = data.description;
        let options = [];
        _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
          options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
        });
        this[obj][ver].options = options;
          console.log("estos es lo que trajo despues del error",this.scrPerNeg[ver])    
      },
      error => {
        console.log('There was an error getting code values ' + dataCode, error);
        this.errPerfNeg(dataCode,obj);
      }
    );

  }

  llenaPerfNeg(scrPerNeg){
    // Cuestionario PerfilNegocio -- scrPerNeg
    let preConf = scrPerNeg;
    let questions:any = []; 
    preConf.forEach(function (element) {
      if(element.dataCode!=''){
        this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
          _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
            options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
          });
          element.options = options;
                
        },
        error => {
          console.log('There was an error getting code values ' + element.dataCode, error);
          console.log('fallo' + element.dataCode);
          this.errPerfNeg(element.dataCode,"scrPerNeg");
          /* this.PerfNeg(this.scrPerMer);  */
        }
      );
      }
      questions.push(element);
    }, this);
    this.scrPerNeg = questions;
   
// expected output: true

    this.llenaPerfMerc(this.scrPerMer); 
    // Cuestionario PerfilNegocio -- Fin
  }

  llenaPerfMerc(scrPerMer){
    // Cuestionario PerfilMercado -- scrPerMer
    let preConf = scrPerMer;
    let questions:any = []; 
    preConf.forEach(function (element) {
      if(element.dataCode!=''){
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
          _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
            options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
          });
          element.options = options;
        },
        error => {
          console.log('There was an error getting code values ' + element.dataCode, error);
          console.log('fallo' + element.dataCode);
          this.errPerfNeg(element.dataCode,"scrPerMer");
        }
      );
      }
      questions.push(element);
      
      
    }, this);
    this.scrPerMer = questions;
    console.log("perfil de mercado",this.scrPerMer)
    this.llenaReputacion(this.scrRep);
    // Cuestionario PerfilMercado -- Fin
  }

  llenaReputacion(scrRep){
    // Cuestionario Reputacion -- scrRep
    let preConf = scrRep;
    let questions:any = []; 
    preConf.forEach(function (element) {
      if(element.dataCode!=''){
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
          _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
            options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
          });
          element.options = options;
          
        },
        error => {
          console.log('There was an error getting code values ' + element.dataCode, error);
          console.log('fallo' + element.dataCode);
          this.errPerfNeg(element.dataCode,"scrRep");
        }
      );
      }
      questions.push(element);
    }, this);
    this.scrRep = questions;
    console.log("reputa",this.scrRep)
    this.llenaDireccion(this.scrDir);
    // Cuestionario Reputacion -- Fin
  }

llenaDireccion(scrDir){
  let opera;
   // Read DataCodes Values
    // Cuestionario Direccion -- scrDir
    let preConf = scrDir;
    let questions:any = []; 
    preConf.forEach(function (element) {
      if(element.dataCode!=''){
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
          _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
            options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
          });
          element.options = options;
        },
        error => {
          console.log('There was an error getting code values ' + element.dataCode, error);
          console.log('fallo' + element.dataCode);
          this.errPerfNeg(element.dataCode,"scrDir");
        }
      );
      }
      questions.push(element);
    }, this);
    this.scrDir = questions;
    console.log("rdireccion",this.scrDir)
    this.llenaquerconocerte(this.qcQc);
    // Cuestionario Direccion -- Fin
}
llenaquerconocerte(qcQc){
  
  let preConf = qcQc;
  let questions:any = []; 
  preConf.forEach(function (element) {
    if(element.dataCode!=''){
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
        _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
          options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
        });
        element.options = options;
      },
      error => {
        console.log('There was an error getting code values ' + element.dataCode, error);
        console.log('fallo' + element.dataCode);
        this.errPerfNeg(element.dataCode,"qcQc");
      }
    );
    }
    questions.push(element);
  }, this);
  this.qcQc = questions;
  console.log("queremos conocerte",this.qcQc)
  this.llenaquerconocerte1(this.qcQc01);
  this.llenaquerconocerte2(this.qcQc02);

}

llenaquerconocerte1(qcQc01){
  
  let preConf = qcQc01;
  let questions:any = []; 
  preConf.forEach(function (element) {
    
    questions.push(element);
  }, this);
  this.qcQc01 = questions;
  console.log("queremos conocerte qcQc01",this.qcQc01)
}

llenaquerconocerte2(qcQc02){
  
  let preConf = qcQc02;
  let questions:any = []; 
  preConf.forEach(function (element) {
    if(element.dataCode!=''){
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
        _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
          options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
        });
        element.options = options;
      },
      error => {
        console.log('There was an error getting code values ' + element.dataCode, error);
        console.log('fallo' + element.dataCode);
        this.errPerfNeg(element.dataCode,"qcQc02");
      }
    );
    }
    questions.push(element);
  }, this);
  this.qcQc02 = questions;
  console.log("queremos conocerte qcQc02",this.qcQc02)
  this.llenaqctn12a13(this.preg12a13);
  
}


llenaquerconocerte0(qcQc10){
  let preConf = qcQc10;
  let questions:any = []; 
  preConf.forEach(function (element) {
    
    questions.push(element);
  }, this);
  this.qcQc10 = questions;
  console.log("queremos conocerte qcQc10",this.qcQc10)
  this.llenaqctn18(this.preg18); 
   this.llenaqctn19a28(this.preg19a28); 
   this.llenaqctn29(this.preg29);
   this.llenaqctn30(this.preg30); 
   this.llenaqctn31(this.preg31);
   this.llenaqctn32(this.preg32);
   this.llenaqctn33(this.preg33);
}
llenaqctn1(preg1){
  let preConf = preg1;
  let questions:any = []; 
  preConf.forEach(function (element) {
 
    questions.push(element);
  }, this);
  this.preg1 = questions;
  console.log("queremos conocerte preg1",this.preg1)
}

llenaqctn2(preg2){
  let preConf = preg2;
  let questions:any = []; 
  preConf.forEach(function (element) {
 
    questions.push(element);
  }, this);
  this.preg2 = questions;
  console.log("queremos conocerte preg2",this.preg2)
}

llenaqctn3(preg3){
  let preConf = preg3;
  let questions:any = []; 
  preConf.forEach(function (element) {
   
    questions.push(element);
  }, this);
  this.preg3 = questions;
  console.log("queremos conocerte preg3",this.preg3)
}

llenaqctn4a5(preg4a5){
  let preConf = preg4a5;
  let questions:any = []; 
  preConf.forEach(function (element) {
 
    questions.push(element);
  }, this);
  this.preg4a5 = questions;
  console.log("queremos conocerte preg4a5",this.preg4a5)
}

llenaqctn6a11(preg6a11){
  let preConf = preg6a11;
  let questions:any = []; 
  preConf.forEach(function (element) {
  
    questions.push(element);
  }, this);
  this.preg6a11 = questions;
  console.log("queremos conocerte preg6a11",this.preg6a11)
}

llenaqctn12a13(preg12a13){
  let preConf = preg12a13;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
        _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
          options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
        });
        element.options = options;
      },
      error => {
        console.log('There was an error getting code values ' + element.dataCode, error);
        console.log('fallo' + element.dataCode);
        this.errPerfNeg(element.dataCode,"preg12a13");
      }
    );
    questions.push(element);
  }, this);
  this.preg12a13 = questions;
  console.log("queremos conocerte preg12a13",this.preg12a13)
  this.llenaqctn19a28(this.preg19a28);
}

llenaqctn14(preg14){
  let preConf = preg14;
  let questions:any = []; 
  preConf.forEach(function (element) {
   
    questions.push(element);
  }, this);
  this.preg14 = questions;
  console.log("queremos conocerte preg14",this.preg14)
}

llenaqctn15(preg15){
  let preConf = preg15;
  let questions:any = []; 
  preConf.forEach(function (element) {

    questions.push(element);
  }, this);
  this.preg15 = questions;
  console.log("queremos conocerte preg15",this.preg15)
}


llenaqctn15_0(preg15_0){
  let preConf = preg15_0;
  let questions:any = []; 
  preConf.forEach(function (element) {
 
    questions.push(element);
  }, this);
  this.preg15_0 = questions;
  console.log("queremos conocerte preg15_0",this.preg15_0)
}

llenaqctn16(preg16){
  let preConf = preg16;
  let questions:any = []; 
  preConf.forEach(function (element) {

    questions.push(element);
  }, this);
  this.preg16 = questions;
  console.log("queremos conocerte preg16",this.preg16)
}

llenaqctn16_0(preg16_0){
  let preConf = preg16_0;
  let questions:any = []; 
  preConf.forEach(function (element) {
  
    questions.push(element);
  }, this);
  this.preg16_0 = questions;
  console.log("queremos conocerte preg16_0",this.preg16_0)
}

llenaqctn17(preg17){
  let preConf = preg17;
  let questions:any = []; 
  preConf.forEach(function (element) {
 
    questions.push(element);
  }, this);
  this.preg17 = questions;
  console.log("queremos conocerte preg17",this.preg17)
}

llenaqctn17_0(preg17_0){
  let preConf = preg17_0;
  let questions:any = []; 
  preConf.forEach(function (element) {

    questions.push(element);
  }, this);
  this.preg17_0 = questions;
  console.log("queremos conocerte preg17_0",this.preg17_0)
}

llenaqctn18(preg18){
  let preConf = preg18;
  let questions:any = []; 
  preConf.forEach(function (element) {

    questions.push(element);
  }, this);
  this.preg18 = questions;
  console.log("queremos conocerte preg17",this.preg18)
}

llenaqctn19a28(preg19a28){
  let preConf = preg19a28;
  let questions:any = []; 
  preConf.forEach(function (element) {
    if(element.dataCode!=''){
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
        _.sortBy(data.codeValues, 'position').forEach(function(codeValue) {
          options.push({id: codeValue.id, name: codeValue.description, score: codeValue.score, position: codeValue.position});
        });
        element.options = options;
      },
      error => {
        console.log('There was an error getting code values ' + element.dataCode, error);
        console.log('fallo' + element.dataCode);
        this.errPerfNeg(element.dataCode,"preg19a28");
      }
    );
    }
    questions.push(element);
  }, this);
  this.preg19a28 = questions;
  console.log("queremos conocerte preg19a28",this.preg19a28)
}

llenaqctn29(preg29){
  let preConf = preg29;
  let questions:any = []; 
  preConf.forEach(function (element) {
    
    questions.push(element);
  }, this);
  this.preg29 = questions;
  //console.log("ver",this.preg29)
  console.log("queremos conocerte preg29",this.preg29)
}

llenaqctn30(preg30){
  let preConf = preg30;
  let questions:any = []; 
  preConf.forEach(function (element) {
    
    questions.push(element);
  }, this);
  this.preg30 = questions;
  //console.log("ver",this.preg29)
  console.log("queremos conocerte preg30",this.preg30)
}

llenaqctn31(preg31){
  let preConf = preg31;
  let questions:any = []; 
  preConf.forEach(function (element) {
    
    questions.push(element);
  }, this);
  this.preg31 = questions;
  //console.log("ver",this.preg29)
  console.log("queremos conocerte preg31",this.preg31)
}

llenaqctn32(preg32){
  let preConf = preg32;
  let questions:any = []; 
  preConf.forEach(function (element) {
    
    questions.push(element);
  }, this);
  this.preg32 = questions;
  //console.log("ver",this.preg29)
  console.log("queremos conocerte preg32",this.preg32)
}

llenaqctn33(preg33){
  let preConf = preg33;
  let questions:any = []; 
  preConf.forEach(function (element) {
    
    questions.push(element);
  }, this);
  this.preg33 = questions;
  //console.log("ver",this.preg29)
  console.log("queremos conocerte preg33",this.preg33)
}

  changedPerNeg(j, i) {
    //this.scrPerNeg[i].value = this.scrPerNeg[i].values[j]
  }


  scrPerNegSend() {
    // ////console.log("form is valid? formScrPerNeg", this.formScrPerNeg.valid);
    if (this.formScrPerNeg.valid) {
      // ////console.log("form", this.formScrPerNeg.value);
      //enviar datos a back

      //console.log("form PerNeg", this.formScrPerNeg.value);
      //console.log("forma PerNeg", this.scrPerNeg);
      //enviar datos a back
      let payload="{";
      for (const key in this.scrPerNeg) {
        payload = payload+`"${this.scrPerNeg[key].dataCode}_cd_${this.scrPerNeg[key].columnId}":${this.scrPerNeg[key].resp},`
       
      }
      payload = payload + `"locale": "es-mx", "dateFormat": "dd MMMM yyyy"}`
      console.log("view perfil de mercado payload", payload)
      this.questionsServices.scorePerfNeg(payload).subscribe(res=>{
        //console.log("res PerNeg",res)
      },err=>{
        //console.log("err PerNeg",err)
      });


      this.instPefNeg.open(1); //aqui ira
    }
  }

  changedPerMer(j, i) {
    //this.scrPerMer[i].value = this.scrPerMer[i].values[j]
  }

  scrPerMerSend() {
    // ////console.log("form is valid? formScrPerMer", this.formScrPerMer.valid);
    if (this.formScrPerMer.valid) {
      // ////console.log("form", this.formScrPerMer.value);
      //enviar datos a back
      //console.log("form PerMer", this.formScrPerMer.value);
      //console.log("forma PerMer", this.scrPerMer);
      //enviar datos a back
      let payload="{";
      for (const key in this.scrPerMer) {
        payload = payload+`"${this.scrPerMer[key].dataCode}_cd_${this.scrPerMer[key].columnId}":${this.scrPerMer[key].resp},`
       
      }
      payload = payload + `"locale": "es-mx", "dateFormat": "dd MMMM yyyy"}`
      //console.log("view", payload)
      this.questionsServices.scorePerfMerc(payload).subscribe(res=>{
        //console.log("res PerMer",res)
      },err=>{
        //console.log("err PerMer",err)
      });

      this.instPefNeg.open(2); //aqui ira
    }
  }

  changedRep(j, i) {
    //this.scrRep[i].value = this.scrRep[i].values[j]
  }

  scrRepSend() {
    // ////console.log("form is valid? formScrRep", this.formScrRep.valid);
    if (this.formScrRep.valid) {
      // ////console.log("form", this.formScrRep.value);
      //enviar datos a back
      //console.log("form rep", this.formScrRep.value);
      //console.log("forma rep", this.scrRep);
      //enviar datos a back
      let payload="{";
      for (const key in this.scrRep) {
        payload = payload+`"${this.scrRep[key].dataCode}_cd_${this.scrRep[key].columnId}":${this.scrRep[key].resp},`
       
      }
      payload = payload + `"locale": "es-mx", "dateFormat": "dd MMMM yyyy"}`
      //console.log("view", payload)
      this.questionsServices.scoreRepSend(payload).subscribe(res=>{
        //console.log("res rep",res)
      },err=>{
        //console.log("err rep",err)
      });
      this.instPefNeg.open(3); //aqui ira
    }
  }

  changedDir(j, i) {
    // this.scrDir[i].score = this.scrDir[i].score[j]
  }

  scrDirSend() {
    // ////console.log("form is valid? formScrDir", this.formScrDir.valid);
    if (this.formScrDir.valid) {
      //console.log("form direccion", this.formScrDir.value);
      //console.log("forma direccion", this.scrDir);
      //enviar datos a back
      let payload="{";
      for (const key in this.scrDir) {
        payload = payload+`"${this.scrDir[key].dataCode}_cd_${this.scrDir[key].columnId}":${this.scrDir[key].resp},`
       
      }
      payload = payload + `"locale": "es-mx", "dateFormat": "dd MMMM yyyy"}`
      //console.log("view", payload)
      this.questionsServices.scoreDirSend(payload).subscribe(res=>{
        //console.log("res senddir",res)
      },err=>{
        //console.log("err senddir",err)
      });
      this.prins.open(1); 
      
    }
  }

  changedqcQc(j, i) {
    //this.qcQc[i].value = this.qcQc[i].value[j]
  }

  queremosConocerteSend() {
    // ////console.log("form is valid? formScrDir", this.formScrDir.valid);
    //console.log("antes del valid", this.formQcQc.value);
    if (this.formQcQc.valid) {
      //console.log("form direccion", this.formQcQc.value);
      //console.log("forma direccion", this.scrDir);
      //enviar datos a back
      let payload="{";
      for (const key in this.qcQc) {
        payload = payload+`"${this.qcQc[key].dataCode}_cd_${this.qcQc[key].columnId}":${this.qcQc[key].resp},`
       
      }
      for (const key in this.qcQc01) {
        payload = payload+`"${this.qcQc01[key].columnId}":"${this.formQcQc.get('qcQc01').value}",`
       
      }
      for (const key in this.qcQc02) {
        payload = payload+`"${this.qcQc02[key].dataCode}_cd_${this.qcQc02[key].columnId}":${this.qcQc02[key].resp},`
       
      }
      for (const key in this.qcQc10) {
        payload = payload+`"${this.qcQc10[key].columnId}":${this.qcQc10[key].resp},`
       
      }
      payload = payload + `"locale": "es-mx", "dateFormat": "yyyy-MM-dd"}`
      //console.log("view", payload)
      this.questionsServices.queremosConocerte(payload).subscribe(res=>{
        //console.log("res senddir",res)
      },err=>{
        //console.log("err senddir",err)
      });
      this.instQrmCnct.open(1); 
      
    }
      
  }
  
  queremosConocerteNegocioSend() {
     // ////console.log("form is valid? formScrDir", this.formScrDir.valid);
    //console.log("antes del valid", this.formQcQcn.value);
    if (this.formQcQcn.valid) {
      //console.log("despues del valid", this.formQcQcn.value);
      
      //enviar datos a back
      let payload="{";
      for (const key in this.preg1) {
        payload = payload+`"${this.preg1[key].columnId}":"${this.preg1[key].resp}",`
       
      }
      
      for (const key in this.preg2) {
        payload = payload+`"${this.preg2[key].columnId}":"${this.formQcQcn.get('preg2').value}",`
       
      }

      for (const key in this.preg3) {
        payload = payload+`"${this.preg3[key].columnId}":"${this.preg3[key].resp}",`
       
      }

      for (const key in this.preg4a5) {
        payload = payload+`"${this.preg4a5[key].columnId}":"${this.preg4a5[key].resp}",`
       
      }

      for (const key in this.preg6a11) {
        payload = payload+`"${this.preg6a11[key].columnId}":"${this.preg6a11[key].resp}",`
       
      }
      
      for (const key in this.preg12a13) {
        payload = payload+`"${this.preg12a13[key].dataCode}_cd_${this.preg12a13[key].columnId}":${this.preg12a13[key].resp},`
       
      }

      for (const key in this.preg14) {
        payload = payload+`"${this.preg14[key].columnId}":"${this.preg14[key].resp}",`
       
      }

      for (const key in this.preg15) {
        payload = payload+`"${this.preg15[key].columnId}":"${this.formQcQcn.get('preg15').value}",`
      }

      for (const key in this.preg15_0) {
          payload = payload+`"${this.preg15_0[key].columnId}":"${this.preg15_0[key].resp}",`
      }

      for (const key in this.preg16) {
        payload = payload+`"${this.preg16[key].columnId}":"${this.formQcQcn.get('preg16').value}",`
       
      }

      for (const key in this.preg16_0) {
        payload = payload+`"${this.preg16_0[key].columnId}":"${this.preg16_0[key].resp}",`
       
      }

      for (const key in this.preg17) {
        payload = payload+`"${this.preg17[key].columnId}":"${this.formQcQcn.get('preg17').value}",`
       
      }

      for (const key in this.preg17_0) {
        payload = payload+`"${this.preg17_0[key].columnId}":"${this.preg17_0[key].resp}",`
       
      }

     for (const key in this.preg18) {
      payload = payload+`"${this.preg18[key].columnId}":"${this.preg18[key].resp}",`
     
    }

    for (const key in this.preg19a28) {
      payload = payload+`"${this.preg19a28[key].dataCode}_cd_${this.preg19a28[key].columnId}":${this.preg19a28[key].resp},`
     
    }

    for (const key in this.preg29) {
      
      payload = payload+`"${this.preg29[key].dataCode}_cd_${this.preg29[key].columnId}":"${this.formQcQcn.get('preg29').value}",`
      
    }

    for (const key in this.preg30) {
      payload = payload+`"${this.preg30[key].dataCode}_cd_${this.preg30[key].columnId}":"${this.formQcQcn.get('preg30').value}",`
     
    }

    for (const key in this.preg31) {
      payload = payload+`"${this.preg31[key].dataCode}_cd_${this.preg31[key].columnId}":"${this.formQcQcn.get('preg31').value}",`
     
    }

    for (const key in this.preg32) {
      payload = payload+`"${this.preg32[key].dataCode}_cd_${this.preg32[key].columnId}":"${this.formQcQcn.get('preg32').value}",`
     
    }

    for (const key in this.preg33) {
      payload = payload+`"${this.preg33[key].dataCode}_cd_${this.preg33[key].columnId}":"${this.formQcQcn.get('preg33').value}",`
     
    }

      payload = payload + `"locale": "es-mx", "dateFormat": "yyyy-MM-dd"}`
      //console.log("view", payload)
      this.questionsServices.queremosConocerNegocio(payload).subscribe(res=>{
        //console.log("res senddir",res)
      },err=>{
        //console.log("err senddir",err)
      });
      this.instQrmCnct.close(1); 
      
    }
  }

  b5() {
    // ////console.log("Reviso valor de check", this.sfina5);
    if (this.sfina5) {
      this.formQcQcn.get("preg15").setValue(" ")
    }
  }

  b6() {
    // ////console.log("Reviso valor de check", this.sfina6);
    if (this.sfina6) {
      this.formQcQcn.get("preg16").setValue(" ")
    }
  }

  b7() {
    // ////console.log("Reviso valor de check", this.sfina7);
    if (this.sfina7) {
      this.formQcQcn.get("preg17").setValue(" ")
    }
  }

  monto() {
    // ////console.log("Reviso valor de check", this.sfina8);
    if (this.sfina2) {
      this.formQcQcn.get("preg2").setValue(" ")
    }
  }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sendQuestions() {
    this.instance[0].open();
    // ////console.log(this.formScrPerNeg.valid,this.formScrPerMer.valid,this.formScrRep.valid,this.formScrDir.valid,this.formQcQc.valid,this.formQcQcn.valid)
    /* if (this.formScrPerNeg.valid){ */
     // console.log(this.formQcQcn)
    if (this.formScrPerNeg.valid && this.formScrPerMer.valid
    && this.formScrRep.valid && this.formScrDir.valid &&
    this.formQcQcn.valid &&
    this.formQcQc.valid){

      let sumPreg15 = 0;
      this.preg15_0.forEach(function(res) {
        sumPreg15 = sumPreg15 + parseInt(res.resp)
      });
      if (isNaN(sumPreg15)) {
        sumPreg15 = 0;
      }
      let sumPreg14 = 0;
      /* this.preg14.forEach(function(res) { */
      for (let i = 1; i<this.preg14.length; i++){
        sumPreg14 = sumPreg14 + parseInt(this.preg14[i].resp)
        console.log("wesa",this.preg14[i])
      }
      if (isNaN(sumPreg14)) {
        sumPreg14 = 0;
      }
      //las pregs 6a11[4] y [3] se sumaran e iran en parametro 1, 12a13[0] parametro 2, 6a11[5] + suma preg14 + suma preg15 parametro 3, clientId parametro 4
      let payload="{";
      payload = payload + `"capacidadpago1":"${this.preg6a11[4].resp + this.preg6a11[3].resp}","capacidadpago2":"${this.preg12a13[0].resp}","capacidadpago3":"${this.preg6a11[5].resp}","capacidadpago4":"${sumPreg14+sumPreg15}",`;
      payload = payload + `"paso":"5","clientid":"${this.clientid}", "userid":"${this.userid}", "base64EncodedAuthenticationKey": "${this.base64EncodedAuthenticationKey}"}`
      console.log("view suma", payload)
      //this.instance[1].open();

     this.instance[0].close();
      this.questionsServices.capacidadPago(payload).subscribe(res=>{
        console.log("res senddir",res)
        this.instance[1].open();
        this.instance[0].close(); //checar esto
      },err=>{
        console.log("err senddir",err)
        this.instance[0].close(); //checar esto
      });
    } else {
      this.instance[0].close();
      swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
      //this.instQrmCnct.open(1); // no ira aqui solo para no completar form
    }
  }
}
