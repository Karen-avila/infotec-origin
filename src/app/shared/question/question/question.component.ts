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
      dataCode: "numero_de_dependientes_economicos",
      columnId: "campo_8",
      question: "",
      options: []
    }
  ];

  /* Queremos conocer tu negocio */
  preg1 = [
    {
      dataCode: "fecha_en_que_inicio_su_actividad_productiva",
      columnId: "campo_1",
      question: "",
      options: []
    }];

    preg2 = [
    {
      dataCode: "registra_el_total_de_ingresos_que_obtuvo_el_nego",
      columnId: "campo_2",
      question: "",
      options: []
      
    }];


  preg3 = [
    {
      dataCode: "cuantas_personas_trabajan_en_su_negocio",
      columnId: "campo_3",
      question: "",
      options: []
    }];

  preg4a5 = [
    {
      dataCode: "cual_es_el_destino_del_credito_es_decir_especifi",
      columnId: "campo_4",
      question: "",
      options: []
    },

    {
      dataCode: "cual_es_el_proposito_del_proyecto_es_decir_en_que",
      columnId: "campo_5",
      question: "",
      options: []
    }];

  preg6a11 = [

    {
      dataCode: "de_cuanto_efectivo_dispone_actualmente_para_cubri",
      columnId: "campo_6",
      question: "",
      options: []
    },
    {
      dataCode: "al_dia_de_hoy_cuato_le_deben_por_venta_de_bienes",
      columnId: "campo_7",
      question: "",
      options: []
      },
    {
      dataCode: "cuanto_obtendria_si_vendiera_el_material_de_ofic",
      columnId: "campo_8",
      question: "",
      options: []
    },
    {
      dataCode: "pensando_en_los_ultimos_6_meses_en_promedio_cuan",
      columnId: "campo_9",
      question: "",
      options: []
    },
    {
      dataCode: "pensando_en_los_ultimos_6_meses_en_promedio_a_cu",
      columnId: "campo_10",
      question: "",
      options: []
    },
    {
      dataCode: "en_promedio_cuanto_gasta_cada_vez_que_surte_su_n",
      columnId: "campo_11",
      question: "",
      options: []
    }];

  preg12a13 = [
    {
      dataCode: "con_que_frecuencia_surte_su_negocio_con_mercanci",
      columnId: "campo_12",
      question: "",
      options: []
    },
    {
      dataCode: "cuando_fue_la_ultima_vez_que_surtio_su_negocio_c",
      columnId: "campo_13",
      question: "",
      options: []
    }];

  preg14 = [
    {
      dataCode: "pensando_en los ultimos_6_meses_en_promedio_iniq",
      columnId: "campo_14",
      question: "",
      options: []
    }
  ];

  preg15 = [
    {
      dataCode: "indique_el_monto_de_financiamiento_que_haya_reci",
      columnId: "campo_15",
      question: "",
      options: []
    }
  ];

  preg16 = [
    {
      dataCode: "cuanto_debe_al_dia_de_hoy_por_los_conceptos_sigu",
      columnId: "campo_16",
      question: "",
      options: []
    }
  ];

  preg17 = [
    {
      dataCode: "en_promedio_cuanto_paga_cada_mes_por_los_concept",
      columnId: "campo_17",
      question: "",
      options: []
    }
  ];

  preg18 = [
    {
      dataCode: "registre_la_cantidad_que_pago_la_empresa_por_los",
      columnId: "campo_18",
      question: "",
      options: []
    }
  ];

  preg19a28 = [
    {
      dataCode: "participo_en_la_convocatoria_2.1_desarrollo_y_fo",
      columnId: "campo_19",
      question: "",
      options: []
    },
    {
      dataCode: "recibio_capacitacion_vinculada_a_su_credito_prov",
      columnId: "campo_20",
      question: "",
      options: []
    },
    {
      dataCode: "ha_solicitado_credito_anteriormente",
      columnId: "campo_21",
      question: "",
      options: []
    },
    {
      dataCode: "sus_ingresos_han_mejorado_despues_de_recibir_un_",
      columnId: "campo_22",
      question: "",
      options: []
    },
    {
      dataCode: "ademas_de_su_oficina_comercio_o_local_principal_",
      columnId: "campo_23",
      question: "",
      options: []
    },
    {
      dataCode: "como_se_lleva_la_contabilidad_de_la_empresa",
      columnId: "campo_24",
      question: "",
      options: []
    },
    {
      dataCode: "la_empresa_tiene_cuenta_bancaria_exclusiva_para_",
      columnId: "campo_25",
      question: "",
      options: []
    },
    {
      dataCode: "durante_el_ejercicio_fiscal_anterior_la_empresa_",
      columnId: "campo_26",
      question: "",
      options: []
    },
    {
      dataCode: "durante_el_ejercicio_fiscal_anterior_se_otorgo_c",
      columnId: "campo_27",
      question: "",
      options: []
    },
    {
      dataCode: "cual_fue_la_principal_causa_por_la_que_durante_e",
      columnId: "campo_28",
      question: "",
      options: []
    }];

  preg29 = [
    {
      dataCode: "en_la_empresa_se_realizan_actualmente_algunas_de",
      columnId: "campo_29",
      question: "",
      options: []
    }];

  preg30 = [
    {
      dataCode: "cual_es_el_motivo_principal_por_el_que_se_inicio",
      columnId: "campo_30",
      question: "",
      options: []
    }];

  preg31 = [
    {
      dataCode: "en_su_negocio_o_actividad_cuanta_con_un_local_pa",
      columnId: "campo_31",
      question: "",
      options: []
    }];

  preg32 = [
    {
      dataCode: "en_caso_de_ser_local_independiente_fuera_de_un_t",
      columnId: "campo_32",
      question: "",
      options: []
    }];

  preg33 = [
    {
      dataCode: "si_no_cuenta_con_un_local_en_donde_se_realizan_l",
      columnId: "campo_33",
      question: "",
      options: []
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
  instance

  constructor(
    public userService: UserService
  ) { }

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

    /* this.formQcQc = new FormGroup({
      qcQc0: new FormControl(null, [Validators.required]),
      qcQc1: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(38)]),
      qcQc2: new FormControl(null, [Validators.required]),
      qcQc3: new FormControl(null, [Validators.required]),
      qcQc4: new FormControl(null, [Validators.required]),
      qcQc5: new FormControl(null, [Validators.required]),
      qcQc6: new FormControl(null, [Validators.required]),
      qcQcI0: new FormControl(null, [Validators.required])
    }); */

    //this.formQcQcn = new FormGroup({
      //preg1: new FormControl(null, [Validators.required]),
      /*preg20: new FormControl(' ',[Validators.required]), //2
      preg20: new FormControl(' ',[Validators.required]), //2
      preg2m: new FormControl(' ',[Validators.required]),//2*/
     /*  preg3: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
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
      preg1410: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]), */

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
     /*  preg180: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(2000000)]),
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
    }); */
  
   this.llenaDireccion(this.scrDir);
   this.llenaReputacion(this.scrRep);
   this.llenaPerfMerc(this.scrPerMer); 
   this.llenaPerfNeg(this.scrPerNeg); 


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
      this.prins.open(1); //aqui ira
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
      this.formQcQcn.get("qcQcnr05").setValue(" ")
    }
  }

  b6() {
    // //console.log("Reviso valor de check", this.sfina6);
    if (this.sfina6) {
      this.formQcQcn.get("qcQcnr06").setValue(" ")
    }
  }

  b7() {
    // //console.log("Reviso valor de check", this.sfina7);
    if (this.sfina7) {
      this.formQcQcn.get("qcQcnr07").setValue(" ")
    }
  }

  monto() {
    // //console.log("Reviso valor de check", this.sfina8);
    if (this.sfina8) {
      this.formQcQcn.get("qcqcnmo").setValue(" ")
    }
  }

  sendQuestions() {
    this.instance[0].open();
    // //console.log(this.formScrPerNeg.valid,this.formScrPerMer.valid,this.formScrRep.valid,this.formScrDir.valid,this.formQcQc.valid,this.formQcQcn.valid)
    /* if (this.formScrPerNeg.valid){ */
    if ((this.formScrPerNeg.valid) && (this.formScrPerMer.valid)
      && (this.formScrRep.valid) && (this.formScrDir.valid)){
        this.instance[1].open();
      //&& (this.formQcQc.valid) && (this.formQcQcn.valid)) {
        this.instance[0].close();
        const questionForm = {
        questions: true,

        scrPerNeg: this.scrPerNeg,
        scrPerMer: this.scrPerMer,
        scrRep: this.scrRep,
        scrDir: this.scrDir,
        //Queremos conocerte
        //qcQc: this.qcQc,
        //qcQc1: this.qcQc1,
        //Queremos conocer tu negocio 
        /* preg1: this.preg1,
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
        preg33: this.preg33, */

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
