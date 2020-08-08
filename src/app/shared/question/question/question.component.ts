import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/service.index';
import { QuestionsService } from '../../../services/service.index';

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
      dataCode: "antiguedad_del_negocio",
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
      dataCode: "principalmente_a_que_plazo_se_cobran_las_ventas",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.2"
    },
    {
      dataCode: "normalmente_como_se_compone_el_inventario_del_ne",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.1"
    },
    {
      dataCode: "desde_hace_cuento_tiempo_el_negocio_es_formal",
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
      dataCode: "seleccione_la_opcion_que_describa_mejor_la_relac",
      columnId: "campo_4",
      question: "",
      options: [],
      value_quest: "0.3"
    },
    {
      dataCode: "como_calificaria_el_historial_de_credito_DE",
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
      resp: "",
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
      dataCode: "MARITAL_STATUS",
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
      dataCode: "ADDRESS_TYPE",
      columnId: "campo_7",
      question: "",
      options: []
    }
  ];

  qcQc10 = [
    {
      dataCode: "",
      columnId: "campo_8",
      question: "¿Número de dependientes economicos? *",
      options: []
    }
  ];

  /* Queremos conocer tu negocio */
  preg1 = [
    {
      dataCode: "",
      columnId: "campo_1",
      question: "¿Fecha en que inició su actividad productiva? *",
      options: []
    }];

    preg2 = [
    {
      dataCode: "registre_el_total_de_ingresos_que_obtuvo_el",
      columnId: "campo_2",
      question: "",
      options: []
      
    }];

    preg2_0 = [
      {
        dataCode: "",
        columnId: "campo_3",
        question: "Monto:",
        options: []
        
      }];


  preg3 = [
    {
      dataCode: "",
      columnId: "campo_4",
      question: "¿Cuántas personas trabajan en su negocio? *",
      options: []
    }];

  preg4a5 = [
    {
      dataCode: "",
      columnId: "campo_5",
      question: "¿Cuál es el destino del crédito; es decir, específicamente para qué va a usar el crédito en su negocio? Por ejemplo, comprar un vehículo para repartir a domicilio.*",
      options: []
    },

    {
      dataCode: "",
      columnId: "campo_6",
      question: "¿Cuál es el propósito del proyecto; es decir, en qué espera que mejore su negocio debido al crédito que solicita? Por ejemplo, incrementar las ventas con la entrega a domicilio. *",
      options: []
    }];

  preg6a11 = [

    {
      dataCode: "",
      columnId: "campo_7",
      question: "¿De cuánto efectivo dispone actualmente para cubrir las operaciones del negocios? Incluya lo que guarda en su casa, en el banco o en el negocio. *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_8",
      question: "¿Al día de hoy cuánto le deben por venta de bienes a crédito o servicios realizados y que aún no le hayan terminado de pagar? *",
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
      question: "Pensando en los últimos 6 meses, en promedio, ¿a cuánto ascienden, cada mes, otros ingresos obtenidos además de los generados por su actividad principal del negocio? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_11",
      question: "Pensando en los últimos 6 meses, en promedio, ¿cuánto vende o ingresa por la realización de sus servicios cada mes sin descontar los gastos? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_12",
      question: "En promedio ¿cuánto gasta cada vez que surte su negocio con mercancías para la venta de bienes o realización de sus servicios? *",
      options: []
    }];

  preg12a13 = [
    {
      dataCode: "con_que_frecuencia_surte_su_negocio_con_mercanci",
      columnId: "campo_13",
      question: "",
      options: []
    },
    {
      dataCode: "cuando_fue_la_ultima_vez_que_surtio_su_negocio_c",
      columnId: "campo_14",
      question: "",
      options: []
    }];

 /*  preg14 = [
    {
      dataCode: "pensando_en los ultimos_6_meses_en_sueldos_salar",
      columnId: "campo_15",
      question: "",
      options: []
    }
  ]; */

  preg14 = [
    {
      dataCode: "",
      columnId: "campo_15",
      question: "¿Pensando en los últimos 6 meses, en promedio, indique cuánto paga cada mes por: Sueldos, salarios o cualquier otro pago a los trabajadores del negocio? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_16",
      question: "¿Servicios públicos? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_17",
      question: "¿Transporte para actividades del negocio? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_18",
      question: "¿Pago por franquicias? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_19",
      question: "¿Promoción y publicidad? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_20",
      question: "¿Servicios contables o legales? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_21",
      question: "¿Mantenimiento del negocio? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_22",
      question: "¿Licencias de software? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_23",
      question: "¿Impuestos? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_24",
      question: "¿Otros gastos no incluidos en la lista pero que son necesarios para la operación de su negocio? *",
      options: []
    }
  ];

  preg15 = [
    {
      dataCode: "indique_el_monto_de_financiamiento_que_haya_reci",
      columnId: "campo_26",
      question: "",
      options: []
    }
  ];

  preg15_0 = [
    {
      dataCode: "",
      columnId: "campo_27",
      question: "¿Monto por Recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_28",
      question: "¿Monto por Préstamos de familiares y amigos que no tienen participación en la empresa?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_29",
      question: "¿Monto por Sistema ﬁnanciero formal ( bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_30",
      question: "¿Monto por Prestamistas particulares (personas que prestan dinero)?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_31",
      question: "¿Monto por Crédito de proveedores?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_32",
      question: "¿Monto por Recursos de inversionistas privados?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_33",
      question: "¿Monto por Otras?",
      options: []
    }
  ];

  preg16 = [
    {
      dataCode: "cuanto_debe_al_dia_de_hoy_por_los_conceptos_sigu",
      columnId: "campo_34",
      question: "",
      options: []
    }
  ];

  preg16_0 = [
    {
      dataCode: "",
      columnId: "campo_35",
      question: "¿Monto por recursos propios (dueños, herencia, familia y amigos) o utilidades reinvertidas? ",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_36",
      question: "¿Monto por préstamos de familiares y amigos que no tienen participación en la empresa?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_37",
      question: "¿Monto por sistema ﬁnanciero formal ( bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_38",
      question: "¿Monto por Prestamistas particulares (personas que prestan dinero)?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_39",
      question: "¿Monto por crédito de proveedores?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_40",
      question: "¿Monto por recursos de inversionistas privados?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_41",
      question: "¿Monto por otras?",
      options: []
    }
  ];

  preg17 = [
    {
      dataCode: "en_promedio_cuanto_paga_cada_mes_por_los_concept",
      columnId: "campo_42",
      question: "",
      options: []
    }
  ];

  preg17_0 = [
    {
      dataCode: "",
      columnId: "campo_43",
      question: "¿Monto por préstamos de familiares y amigos que no tienen participación en la empresa?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_44",
      question: "¿Monto por sistema ﬁnanciero formal ( bancos  privados, Banco del Bienestar, antes Bansefi, o ﬁnancieras)?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_45",
      question: "¿Monto por prestamistas particulares (personas que prestan dinero)?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_46",
      question: "¿Monto por crédito de proveedores?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_47",
      question: "¿Monto por recursos de inversionistas privados?",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_48",
      question: "¿Monto por otras?",
      options: []
    }
  ];

  preg18 = [
    {
      dataCode: "",
      columnId: "campo_49",
      question: "¿Registre la cantidad que pagó la empresa por los siguientes conceptos durante el ejercicio fiscal anterior: Luz? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_50",
      question: "¿Gas? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_51",
      question: "¿Telecomunicaciones (teléfono fijo o celular para el negocio e internet)? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_52",
      question: "¿Materias primas consumidas (a costo de adquisición)? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_53",
      question: "¿Mercancías compradas para reventa? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_54",
      question: "¿Materiales consumidos para la prestación del servicio? *",
      options: []
    },
    {
      dataCode: "",
      columnId: "campo_55",
      question: "¿Otros? *",
      options: []
    }
  ];

  preg19a28 = [
    {
      dataCode: "participo_en_la_convocatoria_2.1_desarrollo_y_fo",
      columnId: "campo_56",
      question: "",
      options: []
    },
    {
      dataCode: "recibio_capacitacion_vinculada_a_su_credito_prov",
      columnId: "campo_57",
      question: "",
      options: []
    },
    {
      dataCode: "ha_solicitado_credito_anteriormente",
      columnId: "campo_58",
      question: "",
      options: []
    },
    {
      dataCode: "sus_ingresos_han_mejorado_despues_de_recibir_un",
      columnId: "campo_59",
      question: "",
      options: []
    },
    {
      dataCode: "ademas_de_su_oficina_comercio_o_local_principal",
      columnId: "campo_60",
      question: "",
      options: []
    },
    {
      dataCode: "como_se_lleva_la_contabilidad_de_la_empresa",
      columnId: "campo_61",
      question: "",
      options: []
    },
    {
      dataCode: "la_empresa_tiene_cuenta_bancaria_exclusiva_para",
      columnId: "campo_62",
      question: "",
      options: []
    },
    {
      dataCode: "durante_el_ejercicio_fiscal_anterior_la_empresa",
      columnId: "campo_63",
      question: "",
      options: []
    },
    {
      dataCode: "durante_el_ejercicio_fiscal_anterior_se_otorgo_c",
      columnId: "campo_64",
      question: "",
      options: []
    },
    {
      dataCode: "cual_fue_la_principal_causa_por_la_que_durante_e",
      columnId: "campo_65",
      question: "",
      options: []
    }];

  preg29a33 = [
    {
      dataCode: "en_la_empresa_se_realizan_actualmente_algunas_de",
      columnId: "campo_66",
      question: "",
      options: [],
      resp: ""
    },
    {
      dataCode: "cual_es_el_motivo_principal_por_el_que_se_inicio",
      columnId: "campo_67",
      question: "",
      options: []
    },
    {
      dataCode: "en_su_negocio_o_actividad_cuanta_con_un_local_pa",
      columnId: "campo_68",
      question: "",
      options: []
    },
    {
      dataCode: "en_caso_de_ser_local_independiente_fuera_de_un_t",
      columnId: "campo_69",
      question: "",
      options: []
    },
    {
      dataCode: "si_no_cuenta_con_un_local_en_donde_se_realizan_l",
      columnId: "campo_70",
      question: "",
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

  constructor(
    public userService: UserService, public questionsServices:QuestionsService) { }

  ngOnInit() {
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
      qcQc1: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(38)]),
      qcQc2: new FormControl(null, [Validators.required]),
      qcQc3: new FormControl(null, [Validators.required]),
      qcQc4: new FormControl(null, [Validators.required]),
      qcQc5: new FormControl(null, [Validators.required]),
      qcQc6: new FormControl(null, [Validators.required]),
      qcQc10: new FormControl(null, [Validators.required])
    }); 

    this.formQcQcn = new FormGroup({
      preg1: new FormControl(null, [Validators.required]),
      preg20: new FormControl(' ',[Validators.required]), 
      preg21: new FormControl(' ',[Validators.required]), 
      /*preg2_0: new FormControl(' ',[Validators.required]), */
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
      preg15: new FormControl('', Validators.required), 
      /* preg15_00: new FormControl('',[Validators.required]),
      preg15_01: new FormControl('',[Validators.required]),
      preg15_02: new FormControl('',[Validators.required]),
      preg15_03: new FormControl('',[Validators.required]),
      preg15_04: new FormControl('',[Validators.required]),
      preg15_05: new FormControl('',[Validators.required]),
      preg15_06: new FormControl('',[Validators.required]) */
      preg16: new FormControl(' ',[Validators.required]),
      /*preg16_00: new FormControl(' ',[Validators.required]),
      preg16_01: new FormControl(' ',[Validators.required]),
      preg16_02: new FormControl(' ',[Validators.required]),
      preg16_03: new FormControl(' ',[Validators.required]),
      preg16_04: new FormControl(' ',[Validators.required]),
      preg16_05: new FormControl(' ',[Validators.required]),
      preg16_06: new FormControl(' ',[Validators.required]),*/
      preg17: new FormControl(' ',[Validators.required]),
      /*preg17_00: new FormControl(' ',[Validators.required]),
      preg17_01: new FormControl(' ',[Validators.required]),
      preg17_02: new FormControl(' ',[Validators.required]),
      preg17_03: new FormControl(' ',[Validators.required]),
      preg17_04: new FormControl(' ',[Validators.required]),
      preg17_05: new FormControl(' ',[Validators.required]), */
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
      preg29a330: new FormControl(null, [Validators.required]),
      preg29a331: new FormControl(null, [Validators.required]),
      preg29a332: new FormControl(null, [Validators.required]),
      preg29a333: new FormControl(null, [Validators.required]) 
    }); 
  
   this.llenaDireccion(this.scrDir);
   this.llenaReputacion(this.scrRep);
   this.llenaPerfMerc(this.scrPerMer); 
   this.llenaPerfNeg(this.scrPerNeg); 
   this.llenaquerconocerte(this.qcQc);
   this.llenaquerconocerte0(this.qcQc10); 
   this.llenaqctn1(this.preg1); 
   this.llenaqctn2(this.preg2); 
   this.llenaqctn2_0(this.preg2_0); 
   this.llenaqctn3(this.preg3); 
   this.llenaqctn4a5(this.preg4a5); 
   this.llenaqctn6a11(this.preg6a11); 
   this.llenaqctn12a13(this.preg12a13); 
   this.llenaqctn14(this.preg14); 
   this.llenaqctn15(this.preg15); 
   this.llenaqctn15_0(this.preg15_0); 
   this.llenaqctn16(this.preg16); 
   this.llenaqctn16_0(this.preg16_0);
   this.llenaqctn17(this.preg17); 
   this.llenaqctn17_0(this.preg17_0);
   this.llenaqctn18(this.preg18); 
   this.llenaqctn19a28(this.preg19a28); 
   this.llenaqctn29a33(this.preg29a33); 


  }

  llenaPerfNeg(scrPerNeg){
    // Cuestionario PerfilNegocio -- scrPerNeg
    let preConf = scrPerNeg;
    let questions:any = []; 
    preConf.forEach(function (element) {
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
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
    this.scrPerNeg = questions;
    // Cuestionario PerfilNegocio -- Fin
  }

  llenaPerfMerc(scrPerMer){
    // Cuestionario PerfilMercado -- scrPerMer
    let preConf = scrPerMer;
    let questions:any = []; 
    preConf.forEach(function (element) {
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
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
    this.scrPerMer = questions;
    // Cuestionario PerfilMercado -- Fin
  }

  llenaReputacion(scrRep){
    // Cuestionario Reputacion -- scrRep
    let preConf = scrRep;
    let questions:any = []; 
    preConf.forEach(function (element) {
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
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
    this.scrRep = questions;
    // Cuestionario Reputacion -- Fin
  }

llenaDireccion(scrDir){
   // Read DataCodes Values
    // Cuestionario Direccion -- scrDir
    let preConf = scrDir;
    let questions:any = []; 
    preConf.forEach(function (element) {
      this.userService.getDataCode(element.dataCode).subscribe(
        data => {
          element.question = data.description;
          let options = [];
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
}
llenaquerconocerte(qcQc){
  // Cuestionario PerfilNegocio -- scrPerNeg
  let preConf = qcQc;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.qcQc = questions;
  // Cuestionario PerfilNegocio -- Fin
}

llenaquerconocerte0(qcQc10){
  let preConf = qcQc10;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.qcQc10 = questions;
}

llenaqctn1(preg1){
  let preConf = preg1;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg1 = questions;
}

llenaqctn2(preg2){
  let preConf = preg2;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg2 = questions;
}


llenaqctn2_0(preg2_0){
  let preConf = preg2_0;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg2_0 = questions;
}

llenaqctn3(preg3){
  let preConf = preg3;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg3 = questions;
}

llenaqctn4a5(preg4a5){
  let preConf = preg4a5;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg4a5 = questions;
}

llenaqctn6a11(preg6a11){
  let preConf = preg6a11;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg6a11 = questions;
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
  this.preg12a13 = questions;
}

llenaqctn14(preg14){
  let preConf = preg14;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg14 = questions;
}

llenaqctn15(preg15){
  let preConf = preg15;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg15 = questions;
}


llenaqctn15_0(preg15_0){
  let preConf = preg15_0;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg15_0 = questions;
}

llenaqctn16(preg16){
  let preConf = preg16;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg16 = questions;
}

llenaqctn16_0(preg16_0){
  let preConf = preg16_0;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg16_0 = questions;
}

llenaqctn17(preg17){
  let preConf = preg17;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg17 = questions;
}

llenaqctn17_0(preg17_0){
  let preConf = preg17_0;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg17_0 = questions;
}

llenaqctn18(preg18){
  let preConf = preg18;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg18 = questions;
}

llenaqctn19a28(preg19a28){
  let preConf = preg19a28;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg19a28 = questions;
}

llenaqctn29a33(preg29a33){
  let preConf = preg29a33;
  let questions:any = []; 
  preConf.forEach(function (element) {
    this.userService.getDataCode(element.dataCode).subscribe(
      data => {
        element.question = data.description;
        let options = [];
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
  this.preg29a33 = questions;
  //console.log("ver",this.preg29)
}

  changedPerNeg(j, i) {
    //this.scrPerNeg[i].value = this.scrPerNeg[i].values[j]
  }


  scrPerNegSend() {
    // //console.log("form is valid? formScrPerNeg", this.formScrPerNeg.valid);
    if (this.formScrPerNeg.valid) {
      // //console.log("form", this.formScrPerNeg.value);
      //enviar datos a back
      this.instPefNeg.open(1); //aqui ira
    }
  }

  changedPerMer(j, i) {
    //this.scrPerMer[i].value = this.scrPerMer[i].values[j]
  }

  scrPerMerSend() {
    // //console.log("form is valid? formScrPerMer", this.formScrPerMer.valid);
    if (this.formScrPerMer.valid) {
      // //console.log("form", this.formScrPerMer.value);
      //enviar datos a back
      this.instPefNeg.open(2); //aqui ira
    }
  }

  changedRep(j, i) {
    //this.scrRep[i].value = this.scrRep[i].values[j]
  }

  scrRepSend() {
    // //console.log("form is valid? formScrRep", this.formScrRep.valid);
    if (this.formScrRep.valid) {
      // //console.log("form", this.formScrRep.value);
      //enviar datos a back
      this.instPefNeg.open(3); //aqui ira
    }
  }

  changedDir(j, i) {
    // this.scrDir[i].score = this.scrDir[i].score[j]
  }

  scrDirSend() {
    // //console.log("form is valid? formScrDir", this.formScrDir.valid);
    if (this.formScrDir.valid) {
      console.log("form direccion", this.formScrDir.value);
      console.log("forma direccion", this.scrDir);
      //enviar datos a back
      let payload="{";
      for (const key in this.scrDir) {
        payload = payload+`"${this.scrDir[key].dataCode}_cd_${this.scrDir[key].columnId}":${this.scrDir[key].resp},`
       
      }
      payload = payload + `"locale": "es-mx", "dateFormat": "dd MMMM yyyy"}`
      console.log("view", payload)
      this.questionsServices.scoreDirSend(payload).subscribe(res=>{
        console.log("res senddir",res)
      },err=>{
        console.log("err senddir",err)
      });
      this.prins.open(1); 
    }
  }

  changedqcQc(j, i) {
    //this.qcQc[i].value = this.qcQc[i].value[j]
  }

  qcQcSend() {
    // //console.log("form is valid? formQcQc", this.formQcQc.valid);
    if (this.formQcQc.valid) {
      // //console.log("form", this.formQcQc.value);
      //enviar datos a back
      this.instQrmCnct.open(1); //aqui ira
    }
  }

  qcQcnSend() {
    // //console.log("formQcQcn", this.formQcQcn.valid);
    // //console.log("form", this.formQcQcn.value);
    if (this.formQcQcn.valid) {
      // //console.log("form", this.formQcQcn.value);
      //enviar datos a back
    }
  }

  b5() {
    // //console.log("Reviso valor de check", this.sfina5);
    if (this.sfina5) {
      this.formQcQcn.get("preg15").setValue(" ")
    }
  }

  b6() {
    // //console.log("Reviso valor de check", this.sfina6);
    if (this.sfina6) {
      this.formQcQcn.get("preg16").setValue(" ")
    }
  }

  b7() {
    // //console.log("Reviso valor de check", this.sfina7);
    if (this.sfina7) {
      this.formQcQcn.get("preg17").setValue(" ")
    }
  }

  monto() {
    // //console.log("Reviso valor de check", this.sfina8);
    if (this.sfina8) {
      this.formQcQcn.get("preg2_0").setValue(" ")
    }
  }

  sendQuestions() {
    this.instance[0].open();
    // //console.log(this.formScrPerNeg.valid,this.formScrPerMer.valid,this.formScrRep.valid,this.formScrDir.valid,this.formQcQc.valid,this.formQcQcn.valid)
    /* if (this.formScrPerNeg.valid){ */
      console.log(this.formQcQcn)
    if (((this.formScrPerNeg.valid) && (this.formScrPerMer.valid)
    && (this.formScrRep.valid) && (this.formScrDir.valid)&&
    this.formQcQcn.valid)&& (this.formQcQcn.valid)){
        this.instance[1].open();
      /* (this.formScrPerNeg.valid) && (this.formScrPerMer.valid)
      && (this.formScrRep.valid) && (this.formScrDir.valid)&& 
      (this.formQcQc.valid) && (this.formQcQc.valid) && (this.formQcQcn.valid)) { */
        this.instance[0].close();
        const questionForm = {
        questions: true,

        scrPerNeg: this.scrPerNeg,
        scrPerMer: this.scrPerMer,
        scrRep: this.scrRep,
        scrDir: this.scrDir,
        //Queremos conocerte
        qcQc: this.qcQc,
        qcQc10: this.qcQc10
        //Queremos conocer tu negocio 
        /* preg1: this.preg1,
        preg2:this.preg2,
        preg2_0:this.preg2_0,
        preg3: this.preg3,
        preg4a5: this.preg4a5,
        preg6a11: this.preg6a11,
        preg12a13: this.preg12a13,
        preg14: this.preg14,
        preg15: this.preg15,
        preg15_0:this.preg15_0,
        preg16:this.preg16,
        preg16_0:this.preg16_0,
        preg17:this.preg17,
        preg17_0:this.preg17_0,
        preg18:this.preg18,
        preg19a28: this.preg19a28,
        preg29a33: this.preg29a33,
        */
      }
      window.parent.postMessage(questionForm, '*');
    }

    else {
      this.instance[0].close();
      swal('¡Cuidado!', 'Para poder continuar, completa correctamente todos los campos.', 'error');
      //this.instQrmCnct.open(1); // no ira aqui solo para no completar form
    }
  }
}
