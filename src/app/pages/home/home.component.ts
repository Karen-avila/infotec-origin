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
    const montoCapital = 20000 * -1;
    // Tasa de Interes Anual
    const tasaInteresAnual = 0.10; // cambio a 12
    // Tasa de Interes Mensual
    const tasaInteresMensual = tasaInteresAnual / 12; // #meses
    // Plazo del Credito
    const plazoCredito = 18;
    // Monto del Pago Mensual
    const pmt = this.finance.PMT(tasaInteresMensual, plazoCredito, montoCapital);
    console.log("PAGO MENSUAL ", pmt);
    const pagos = [montoCapital,0,0,0];
    //pagos.push(montoCapital);
    for (let i = 0; i < plazoCredito; i++) {
      pagos.push(pmt);
    }
    const tirMensual = this.finance.IRR.apply(this, pagos);
   
    
    this.catPorcentaje = ((Math.pow((1 + (tirMensual / 100)), 12)) - 1) * 100;
    //console.log("CAT "+ this.catPorcentaje.toFixed(2)+"%");
  }

  ngOnInit() {
    // ////console.log("en home")
       
      let elems = document.querySelectorAll('.carousel');
      M.Carousel.init(elems, {fullWidth: true, duration: 500});
      this.car;
    
  }

  

carr(){
    this.tim = setInterval(function(){
    //// ////console.log("hi")
    let carusel = document.querySelector(".carousel");
    let nxt = M.Carousel.getInstance(carusel);
    nxt.next(1);
  }, 5000);
}

ngOnDestroy(){
  clearInterval(this.tim);
}

}
