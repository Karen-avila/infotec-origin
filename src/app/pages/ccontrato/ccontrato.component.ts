import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { LoanDataService } from '../../services/service.index';

import * as moment from 'moment';
import { Finance } from 'financejs';

@Component({
  selector: 'app-ccontrato',
  templateUrl: './ccontrato.component.html',
  styleUrls: ['./ccontrato.component.css']
})
export class CcontratoComponent implements OnInit {
  personalData;
  pagareB64;
  loanData;
  date;
  finance = new Finance();
  catPorcentaje = 0;
  

  constructor(public loanService: LoanDataService) { 
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
    this.loanService.nombre.subscribe((value) => {
      this.loanData = value; 
  });
  this.loanService.personalData.subscribe((value) => {
    this.personalData = value; 
});

  

 
    //anualInterestRate  --> interes anual
    //totalRepaymentExpected --> MOnto total a pagar
    //numberOfRepayments --> numero de pagos
    //humanReadable --> fecha limite depago

    this.date = moment().locale('es').format('Do MMMM YYYY');
  }

  

  downloadPDF($event, target) {
    html2canvas(document.querySelector(`#PDF${target}`), {
      scale: .75
    }).then(async (canvas) => {
      const imgData = await canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'pt','a4');
      doc.addImage(imgData, 'PNG', 10, 10, 572, 770);
      var base = doc.output('datauristring');  //Base 64 pdf
      this.pagareB64 = base;
      doc.save(`${target}.pdf`);
    });
  }

}
