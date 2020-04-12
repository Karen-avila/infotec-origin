import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

tim;
car = this.carr();
  valueMon: number = 10000;
  optionsMon: Options = {
    floor: 0,
    ceil: 20000,
    step: 5000,
    minLimit: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Si te Prestamos:</b> $' + value;
        case LabelType.Ceil:
          return '<b>Monto Maximo:</b> $' + value;
        default:
          return '<b>Monto</b>';
      }
          //return '<b>Si te Prestamos:</b> $' + value;
    }
  };
  valuePlaz: number = 6;
  optionsPlaz: Options = {
    floor: 0,
    ceil: 36,
    step: 6,
    minLimit: 6,
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
