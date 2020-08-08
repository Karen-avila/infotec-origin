import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { LoanDataService } from '../../services/service.index';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {

  loanData;
  pagareB64;

  constructor(public loanService: LoanDataService) { }

  ngOnInit() {

    this.loanService.getLoanData().subscribe(
      data => {
        this.loanData = data;
        //console.log("amortizacion",this.loanData);
      },
      error => console.error('error en data loan ')
    )
  }

  downloadPDF($event, target) {
    html2canvas(document.querySelector(`#PDF${target}`), {
      scale: .75
    }).then(async (canvas) => {
      const imgData = await canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm','a4',true);
      doc.addImage(imgData, 'PNG', 10, 10);
      var base = doc.output('datauristring');  //Base 64 pdf
      /* var base = imgData; */
      ////console.log("base64 amort png",base);
      this.pagareB64 = base;
      /* doc.save(`${target}.pdf`); */  //descarga Pdf
    });
  }

}
