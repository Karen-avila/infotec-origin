import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-avisodeprivacidadintegral',
  templateUrl: './avisodeprivacidadintegral.component.html',
  styleUrls: ['./avisodeprivacidadintegral.component.css']
})
export class AvisodeprivacidadintegralComponent implements OnInit {
  pagareB64;

  constructor() { }

  ngOnInit() {
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
