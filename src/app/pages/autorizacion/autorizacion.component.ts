import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css']
})
export class AutorizacionComponent implements OnInit {
date;
pagareB64;

  constructor() { }

  ngOnInit() {

    this.date = moment().locale('es').format('Do MMMM YYYY');
  
  }

  downloadPDF($event, target) {
    html2canvas(document.querySelector(`#PDF${target}`), {
      scale: .75
    }).then(async (canvas) => {
      const imgData = await canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'pt','a4');
    
    doc.addImage(imgData, 'PNG', 10, -200, 572, 700);
    var base = doc.output('datauristring');  //Base 64 pdf
    /* var base = imgData; */
    ////console.log("base64 amort png",base);
    this.pagareB64 = base;
    doc.save(`${target}.pdf`);  //descarga Pdf
  });
}
  
}
