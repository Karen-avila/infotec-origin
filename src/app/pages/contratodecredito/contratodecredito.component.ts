import { Component, OnInit } from '@angular/core';
import { LoanDataService } from '../../services/service.index';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as moment from 'moment';

@Component({
  selector: 'app-contratodecredito',
  templateUrl: './contratodecredito.component.html',
  styleUrls: ['./contratodecredito.component.css']
})
export class ContratodecreditoComponent implements OnInit {
loanData;
date;
pagareB64;
  constructor(public loanService: LoanDataService) { }

  ngOnInit() {
    this.loanService.nombre.subscribe((value) => {
      this.loanData = value; 
  });

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
    /* var base = imgData; */
    ////console.log("base64 amort png",base);
    this.pagareB64 = base;
    doc.save(`${target}.pdf`);  //descarga Pdf

 
    });
  }

}
