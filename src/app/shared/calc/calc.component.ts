import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Finance } from 'financejs';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  @Output()
  montPlaz = new EventEmitter<object>();

  monte;

  valueMon: number = 20000;
  optionsMon: Options = {
    floor: 0,
    ceil: 50000,
    step: 10000,
    minLimit: 20000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.monte = value.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
          });
          return '<b>Si te Prestamos: </b>MX' + this.monte;
        case LabelType.Ceil:
          return '<b>Monto Máximo: </b>MX' + value.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
          });
        default:
          return '<b>Monto</b>';
      }
      //return '<b>Si te Prestamos:</b> $' + value;
    }
  };
  valuePlaz: number = 18;
  optionsPlaz: Options = {
    floor: 0,
    ceil: 36,
    step: 18,
    minLimit: 18,
    maxLimit: 18,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>' + value + ' Meses + 3 meses de gracia</b>';
        case LabelType.Ceil:
          return '<b> Total 21 Meses </b>';
        default:
          return '<b>Plazo</b>';
      }
      //return '<b>Si te Prestamos:</b> $' + value;
    }
  };
  finance = new Finance();
  catPorcentaje = 0;

  constructor() { 
      // Monto del Prestamo
      const montoCapital = 20000 * -1;
      // Tasa de Interes Anual
      const tasaInteresAnual = 0.12; // cambio a 12
      // Tasa de Interes Mensual
      const tasaInteresMensual = tasaInteresAnual / 12;
      // Plazo del Credito
      const plazoCredito = 18;
      // Monto del Pago Mensual
      const pmt = this.finance.PMT(tasaInteresMensual, plazoCredito, montoCapital);
      // // ////console.log("PAGO MENSUAL ", pmt.toFixed(2));
      const pagos = [];
      pagos.push(montoCapital);
      for (let i = 0; i < plazoCredito; i++) {
        pagos.push(pmt);
      }
      const tirMensual = this.finance.IRR.apply(this, pagos);
     
      
      this.catPorcentaje = ((Math.pow((1 + (tirMensual / 100)), 12)) - 1) * 100;
      // // ////console.log("CAT "+ this.catPorcentaje.toFixed(2)+"%");
  }

  ngOnInit() {
  }

  sendMonto(){
    this.montPlaz.emit({valueMon:this.valueMon,valuePlaz:this.valuePlaz});
  }



}
