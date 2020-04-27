import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import * as M from 'materialize-css';
import { Options, LabelType } from 'ng5-slider';

import { Finance } from 'financejs'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

tim;
car = this.carr();

  valueMon: number = 20000;
  optionsMon: Options = {
    floor: 0,
    ceil: 50000,
    step: 10000,
    minLimit: 20000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Si te Prestamos: </b>MX' +  value.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
          }); 
        case LabelType.Ceil:
          return '<b>Monto Maximo: </b>MX' + value.toLocaleString('es-MX', {
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
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>' + value + ' Meses</b>';
        case LabelType.Ceil:
          return '<b>' + value + ' Meses</b>';
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
    var montoCapital = 20000 * -1;
    // Tasa de Interes Anual
    var tasaInteresAnual = 0.15;
    // Tasa de Interes Mensual
    var tasaInteresMensual = tasaInteresAnual / 12;
    // Plazo del Credito
    var plazoCredito = 18;
    // Monto del Pago Mensual
    var pmt = this.finance.PMT(tasaInteresMensual, plazoCredito, montoCapital);
    console.log("PAGO MENSUAL ", pmt.toFixed(2));
    var pagos = [];
    pagos.push(montoCapital);
    for (var i = 0; i < plazoCredito; i++) {
        pagos.push(pmt);
    }
    var tirMensual = this.finance.IRR.apply(this, pagos);
    console.log("TIR MENSUAL " +tirMensual.toFixed(2) +"%");
    var tirAnual = tirMensual * 12;
    console.log("TIR ANUAL "+ tirAnual.toFixed(2)+"%");
    var cat = (Math.pow((1 + (tirMensual / 100)), 12)) - 1;
    console.log("CAT "+cat.toFixed(2)+"%");
    this.catPorcentaje  = ((Math.pow((1 + (tirMensual / 100)), 12)) - 1) * 100;    
    console.log("CAT "+ this.catPorcentaje.toFixed(2)+"%");
  }

  ngOnInit() {
    console.log("en home")
       
      let elems = document.querySelectorAll('.carousel');
      M.Carousel.init(elems, {fullWidth: true, duration: 500});
      this.car;
    
  }

  

carr(){
    this.tim = setInterval(function(){
    console.log("hi")
    let carusel = document.querySelector(".carousel");
    let nxt = M.Carousel.getInstance(carusel);
    nxt.next(1);
  }, 5000);
}

ngOnDestroy(){
  clearInterval(this.tim);
}

}
