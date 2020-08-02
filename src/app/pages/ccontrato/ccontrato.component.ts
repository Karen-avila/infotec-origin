import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ccontrato',
  templateUrl: './ccontrato.component.html',
  styleUrls: ['./ccontrato.component.css']
})
export class CcontratoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //anualInterestRate  --> interes anual
    //totalRepaymentExpected --> MOnto total a pagar
    //numberOfRepayments --> numero de pagos
    //humanReadable --> fecha limite depago
  }

  downloadPDF($event, target) {
    html2canvas(document.querySelector(`#PDF${target}`), {
      scale: .75
    }).then(async (canvas) => {
      const imgData = await canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm');
      doc.addImage(imgData, 'PNG', 10, 10);
      doc.save(`${target}.pdf`);
    });
  }

}
