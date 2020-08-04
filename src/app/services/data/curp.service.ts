import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()

export class CurpService {
  CURP_NOMBRES_INVALIDOS = [
    "D", "DALL", "DELLA", "DES", "DU,", "VANDER",
    "DA", "DAS", "DE", "DEL", "DER", "DI",
    "DIE", "DD", "EL", "LA", "LOS", "LAS", "LE", "LES", "MC",
    "MAC", "VAN", "VON", "Y", "MARIA", "MA", "MA.", "JOSE", "J",
    "J.", "M", "M."];

  CURP_VOCALES = ["A", "E", "I", "O", "U"];

  CURP_COMBINACIONES_INVALIDAS = ["BACA",
    "BAKA", "BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO",
    "CAKA", "CAKO", "COGE", "COGI", "COJA", "COJE", "COJI",
    "COJO", "COLA", "CULO", "FALO", "FETO", "GETA", "GUEI",
    "GUEY", "JETA", "JOTO", "KACA", "KACO", "KAGA", "KAGO",
    "KAKA", "KAKO", "KOGE", "KOGI", "KOJA", "KOJE", "KOJI",
    "KOJO", "KOLA", "KULO", "LILO", "LOCA", "LOCO", "LOKA",
    "LOKO", "MAME", "MAMO", "MEAR", "MEAS", "MEON", "MIAR",
    "MION", "MOCO", "MOKO", "MULA", "MULO", "NACA", "NACO",
    "PEDA", "PEDO", "PENE", "PIPI", "PITO", "POPO", "PUTA",
    "PUTO", "QULO", "RATA", "ROBA", "ROBE", "ROBO", "RUIN",
    "SENO", "TETA", "VACA", "VAGA", "VAGO", "VAKA", "VUEI",
    "VUEY", "WUEI", "WUEY"];

  ACCENTS = {
    'À': 'A',
    'Á': 'A',
    'Â': 'A',
    'Ã': 'A',
    'Ä': 'A',
    'Å': 'A',
    'à': 'a',
    'á': 'a',
    'â': 'a',
    'ã': 'a',
    'ä': 'a',
    'å': 'a',
    'Ò': 'O',
    'Ó': 'O',
    'Ô': 'O',
    'Õ': 'O',
    'Ö': 'O',
    'Ø': 'O',
    'ò': 'o',
    'ó': 'o',
    'ô': 'o',
    'õ': 'o',
    'ö': 'o',
    'ø': 'o',
    'È': 'E',
    'É': 'E',
    'Ê': 'E',
    'Ë': 'E',
    'è': 'e',
    'é': 'e',
    'ê': 'e',
    'ë': 'e',
    'ð': 'e',
    'Ç': 'C',
    'ç': 'c',
    'Ð': 'D',
    'Ì': 'I',
    'Í': 'I',
    'Î': 'I',
    'Ï': 'I',
    'ì': 'i',
    'í': 'i',
    'î': 'i',
    'ï': 'i',
    'Ù': 'U',
    'Ú': 'U',
    'Û': 'U',
    'Ü': 'U',
    'ù': 'u',
    'ú': 'u',
    'û': 'u',
    'ü': 'u',
    'Ñ': 'N',
    'ñ': 'n',
    'Š': 'S',
    'š': 's',
    'Ÿ': 'Y',
    'ÿ': 'y',
    'ý': 'y',
    'Ž': 'Z',
    'ž': 'z'
  };
  SEX_MASCULINO = ["MASCULINO", "M", "HOMBRE", "H", "MALE"];
  SEX_FEMENINO = ["FEMENINO", "F", "MUJER", "FEMALE"];

  EDO_AGUASCALIENTES = ["AGUASCALIENTES", "AS", "AGS"];
  EDO_CALIFORNIA_NORTE = ["BAJA CALIFORNIA", "BAJA CALIFORNIA NORTE", "BC"];
  EDO_CALIFORNIA_SUR = ["BAJA CALIFORNIA SUR", "BCS", "BS"];
  EDO_CAMPECHE = ["CAMPECHE"];
  EDO_COAHUILA = ["COAHUILA", "COAHUILA DE ZARAGOZA", "COAHUILA ZARAGOZA", "COAH", "CL"];
  EDO_COLIMA = ["COLIMA", "COL", "CM"];
  EDO_CHIAPAS = ["CHIAPAS", "CHIS", "CS"];
  EDO_CHIHUAHUA = ["CHIHUAHUA", "CHIH", "CH"];
  EDO_DISTRITO_FEDERAL = ["DISTRITO FEDERAL", "DF", "CIUDAD DE MEXICO", "CIUDAD DE MÉXICO"];
  EDO_DURANGO = ["DURANGO", "DGO", "DG"];
  EDO_GUANAJUATO = ["GUANAJUATO", "GTO", "GT"];
  EDO_GUERRERO = ["GUERRERO", "GRO", "GR"];
  EDO_HIDALGO = ["HIDALGO", "HGO", "HG"];
  EDO_JALISCO = ["JALISCO", "JAL", "JC"];
  EDO_MEXICO = ["MEXICO", "ESTADO DE MEXICO", "ESTADO MEXICO", "MÉXICO", "ESTADO DE MÉXICO", "ESTADO MÉXICO", "MEX", "MÉX", "MC"];
  EDO_MICHOACAN = ["MICHOACAN", "MICHOACAN DE OCAMPO", "MICHOACAN OCAMPO", "MICHOACÁN", "MICHOACÁN DE OCAMPO", "MICHOACÁN OCAMPO", "MICH", "MN"];
  EDO_MORELOS = ["MORELOS", "MOR", "MS"];
  EDO_NAYARIT = ["NAYARIT", "NAY", "NT"];
  EDO_NUEVO_LEON = ["NUEVO LEON", "NUEVO LEÓN", "NL"];
  EDO_OAXACA = ["OAXACA", "OAX", "OC"];
  EDO_PUEBLA = ["PUEBLA", "PUE", "PL"];
  EDO_QUERETARO = ["QUERETARO", "QUERETARO DE ARTEAGA", "QUERETARO ARTEAGA", "QUERÉTARO", "QUERÉTARO DE ARTEAGA", "QUERÉTARO ARTEAGA", "QRO", "QT"];
  EDO_QUINTANA_ROO = ["QUINTANA ROO", "QR"];
  EDO_SAN_LUIS_POTOSI = ["SAN LUIS POTOSI", "SLP", "SP"];
  EDO_SINALOA = ["SINALOA", "SIN", "SL"];
  EDO_SONORA = ["SONORA", "SON", "SR"];
  EDO_TABASCO = ["TABASCO", "TAB", "TC"];
  EDO_TAMAULIPAS = ["TAMAULIPAS", "TAMS", "TS"];
  EDO_TLAXCALA = ["TLAXCALA", "TLAX", "TL"];
  EDO_VERACRUZ = ["VERACRUZ", "VERACRUZ DE IGNACIO DE LA LLAVE", "VERACRUZ IGNACIO LA LLAVE", "VERACRUZ LA LLAVE", "VERACRUZ LLAVE", "VERACRUZ IGNACIO LLAVE", "VER.", "VER", "VZ"];
  EDO_YUCATAN = ["YUCATAN", "YUCATÁN", "YUC", "YN"];
  EDO_ZACATECAS = ["ZACATECAS", "ZAC", "ZS"];

  constructor() { }

  transformarSexo(sexo: string): string {
    if (this.SEX_MASCULINO.includes(sexo)) {
      return "H";
    }
    if (this.SEX_FEMENINO.includes(sexo)) {
      return "M";
    }
    return "";
  }

  transformarEstadoNacimientoBad(lugarNacimiento: string): string {
    if (this.EDO_AGUASCALIENTES.includes(lugarNacimiento)) {
      return "AS";
    }
    if (this.EDO_CALIFORNIA_NORTE.includes(lugarNacimiento)) {
      return "BC";
    }
    if (this.EDO_CALIFORNIA_SUR.includes(lugarNacimiento)) {
      return "BS";
    }
    if (this.EDO_CAMPECHE.includes(lugarNacimiento)) {
      return "CC";
    }
    if (this.EDO_COAHUILA.includes(lugarNacimiento)) {
      return "CL";
    }
    if (this.EDO_COLIMA.includes(lugarNacimiento)) {
      return "CM";
    }
    if (this.EDO_CHIAPAS.includes(lugarNacimiento)) {
      return "CS";
    }
    if (this.EDO_CHIHUAHUA.includes(lugarNacimiento)) {
      return "CH";
    }
    if (this.EDO_DISTRITO_FEDERAL.includes(lugarNacimiento)) {
      return "DF";
    }
    if (this.EDO_DURANGO.includes(lugarNacimiento)) {
      return "DG";
    }
    if (this.EDO_GUANAJUATO.includes(lugarNacimiento)) {
      return "GT";
    }
    if (this.EDO_GUERRERO.includes(lugarNacimiento)) {
      return "GR";
    }
    if (this.EDO_HIDALGO.includes(lugarNacimiento)) {
      return "HG";
    }
    if (this.EDO_JALISCO.includes(lugarNacimiento)) {
      return "JC";
    }
    if (this.EDO_MEXICO.includes(lugarNacimiento)) {
      return "MC";
    }
    if (this.EDO_MICHOACAN.includes(lugarNacimiento)) {
      return "MN";
    }
    if (this.EDO_MORELOS.includes(lugarNacimiento)) {
      return "MS";
    }
    if (this.EDO_NAYARIT.includes(lugarNacimiento)) {
      return "NT";
    }
    if (this.EDO_NUEVO_LEON.includes(lugarNacimiento)) {
      return "NL";
    }
    if (this.EDO_OAXACA.includes(lugarNacimiento)) {
      return "OC";
    }
    if (this.EDO_PUEBLA.includes(lugarNacimiento)) {
      return "PL";
    }
    if (this.EDO_QUERETARO.includes(lugarNacimiento)) {
      return "QT";
    }
    if (this.EDO_QUINTANA_ROO.includes(lugarNacimiento)) {
      return "QR";
    }
    if (this.EDO_SAN_LUIS_POTOSI.includes(lugarNacimiento)) {
      return "SP";
    }
    if (this.EDO_SINALOA.includes(lugarNacimiento)) {
      return "SL";
    }
    if (this.EDO_SONORA.includes(lugarNacimiento)) {
      return "SR";
    }
    if (this.EDO_TABASCO.includes(lugarNacimiento)) {
      return "TC";
    }
    if (this.EDO_TAMAULIPAS.includes(lugarNacimiento)) {
      return "TS";
    }
    if (this.EDO_TLAXCALA.includes(lugarNacimiento)) {
      return "TL";
    }
    if (this.EDO_VERACRUZ.includes(lugarNacimiento)) {
      return "VZ";
    }
    if (this.EDO_YUCATAN.includes(lugarNacimiento)) {
      return "YN";
    }
    if (this.EDO_ZACATECAS.includes(lugarNacimiento)) {
      return "ZS";
    }
    return "";
  }

  generarCURP(nombre, apPaterno, apMaterno, fechaNacimiento, sexo, lugarNacimiento):string {
    var curp:string = "";
    var lugarCurp:string = "";
    var sexoCurp:string = "";

    nombre = this.stripAccents(nombre.toUpperCase().trim());
    apPaterno = this.stripAccents(apPaterno.toUpperCase().trim());
    apMaterno = this.stripAccents(apMaterno.toUpperCase().trim());
    fechaNacimiento = fechaNacimiento.toUpperCase().trim();
    sexo = sexo.toUpperCase().trim();
    lugarNacimiento = this.stripAccents(lugarNacimiento.toUpperCase().trim());

    var fechaCurp:any = null;
    var formatter = moment(fechaNacimiento);
    try {
      fechaCurp = ("0" + formatter.date()).slice(-2) + "-" + ("0" + (formatter.month() + 1)).slice(-2) + "-" + formatter.year();
    } catch (err) {
      fechaCurp = null;
    }

    try {
      lugarCurp = this.transformarEstadoNacimientoBad(lugarNacimiento);
      sexoCurp = this.transformarSexo(sexo);

      if (fechaCurp != null && lugarCurp != null && sexoCurp != null) {
        curp = this.calculaCURP(true, apPaterno, apMaterno, nombre, fechaNacimiento, sexoCurp, lugarCurp);
      }
    } catch (err) {
      //console.log(err);
    }
    return curp;
  }

  calculaCURP(sustitucion, apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento, sexo, entidadNacimiento): string {
    var curp = null;

    try {
      var sdf = moment(fechaNacimiento);
      var anioFec:any = sdf.year();

      var af = parseInt(anioFec);

      curp = this.generaRaizCURP(sustitucion, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, entidadNacimiento);
      curp += (af < 2000) ? "0" : "A";

      var acumulado = 0;
      var contador = 18;
      var s = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ-";

      for (var i = 0; i < curp.length; i++) {
        var c = (curp[i] == 'Ñ') ? '&' : (curp[i] == ' ') ? '-' : curp[i];
        var v = s.indexOf(c);
        acumulado += (v * contador);
        contador--;
      }
      acumulado = 10 - (acumulado % 10);
      curp += acumulado == 10 ? "0" : acumulado;

    } catch (err) {
      throw ("Error al generar la CURP: " + err.message);
    }

    if (!curp.match("[A-Z]{4}[0-9]{6}[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[A0][0-9]{1}"))
      throw ("La CURP que se genero es invalida: " + curp);

    return curp;
  }

  generaRaizCURP(sustitucion, nombre, apPaterno, apMaterno, fecNacimiento, sexo, entidad): string {
    var curp = this.generaRaizCURP2(nombre, apPaterno, apMaterno, fecNacimiento, sexo, entidad);

    if (sustitucion) {
      if (this.CURP_COMBINACIONES_INVALIDAS.includes(curp.substring(0, 4))) {
        curp = curp.charAt(0) + "X" + curp.substring(2);
      }
    }
    return curp;
  }

  generaRaizCURP2(nombre, apPaterno, apMaterno, fechaNacimiento, sexo, entidad) {
    var fecFormateadaMoment = moment(fechaNacimiento);
    var fecFormateada = fecFormateadaMoment.year().toString().substr(2) + ("0" + (fecFormateadaMoment.month() + 1)).slice(-2) + ("0" + fecFormateadaMoment.date()).slice(-2);
    var ap = this.nombreValidado(apPaterno);
    var am = this.nombreValidado(apMaterno);
    var n = this.nombreValidado(nombre);

    var amExists = am == null || am.length != 0;

    var raizCURP = "";
    raizCURP += ap.substring(0, 1);
    ap = ap.substring(1);

    for (var i = 0; i < ap.length; i++) {
      if (this.CURP_VOCALES.includes(ap[i])) {
        raizCURP += ap[i];
        break;
      }
    }

    raizCURP += amExists ? am.charAt(0) : "X";
    raizCURP += n.charAt(0);

    if (amExists) {
      am = am.substring(1);
    }

    n = n.substring(1);

    raizCURP += fecFormateada;
    raizCURP += sexo;
    raizCURP += entidad;

    raizCURP += this.getConsonante(ap, 1);
    var consonante = this.getConsonante(am, 1);
    raizCURP += amExists && (consonante != null) ? consonante : "X";
    raizCURP += this.getConsonante(n, 1);

    return raizCURP;
  }

  nombreValidado(nombre) {
    if (nombre == null) {
      return "XX";
    }

    nombre = nombre.toUpperCase().split('Ñ').join('X').split('  ').join(' ');

    if (nombre.toUpperCase() == "JOSE MARIA")
      nombre = "MARIA";
    else if (nombre.toUpperCase() == "MARIA JOSE")
      nombre = "JOSE";


    var partes = nombre.split(" ");
    var nv = "";
    if (partes.length == 1) {
      nv = partes[0];
    } else {
      for (var i = 0; i < partes.length; i++) {
        nv += (this.CURP_NOMBRES_INVALIDOS.includes(partes[i]) ? "" : " " + partes[i]);
      }
      nv = nv.trim();
    }
    return nv + "XX";
  }

  getConsonante(nombre, posicion): string {
    var p = posicion;
    var res = null;
    for (var i = 0; i < nombre.length; i++) {
      if (!this.CURP_VOCALES.includes(nombre[i] + "")) {
        p--;
        if (p == 0) {
          res = nombre[i];
          break;
        }
      }
    }
    return res;
  }

  contains(arreglo, valor) {
    var respuesta = false;
    for (var i = 0; i < arreglo.length; i++) {
      if (arreglo[i] == valor) {
        respuesta = true;
        break;
      }
      //Do something
    }
    return respuesta;
  }

  stripAccents(s): string {
    var r = s.toLowerCase();
    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    r = r.replace(new RegExp("æ", 'g'), "ae");
    r = r.replace(new RegExp("ç", 'g'), "c");
    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    //        r = r.replace(new RegExp("ñ", 'g'),"n");                            
    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    r = r.replace(new RegExp("œ", 'g'), "oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    return r.toUpperCase();
  }

}
