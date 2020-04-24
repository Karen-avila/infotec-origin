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
          return '<b>Si te Prestamos: </b>' +  value.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
          }); 
        case LabelType.Ceil:
          return '<b>Monto Maximo: </b>' + value.toLocaleString('es-MX', {
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


  constructor() { 
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
