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
    
    var img1 = '';
    var img2 = '';
    var img3 = '';
    var img4 = '';
    var img5 = '';
    var img6 = '';
    var doc = new jsPDF('p', 'pt','a4');
    html2canvas(document.querySelector(`#content1`), { scale: .75})
    .then(canvas => {
      img1 = canvas.toDataURL('image/png');
    html2canvas(document.querySelector("#content2"), { scale: .75})
    .then(canvas => {
      img2 = canvas.toDataURL('image/png');
    html2canvas(document.querySelector("#content3"), { scale: .75})
    .then(canvas => {
      img3 = canvas.toDataURL('image/png');
    html2canvas(document.querySelector("#content4"), { scale: .75})
    .then(canvas => {
      img4 = canvas.toDataURL('image/png');
    html2canvas(document.querySelector("#content5"), { scale: .75})
    .then(canvas => {
      img5 = canvas.toDataURL('image/png');
    html2canvas(document.querySelector("#content6"), { scale: .75})
    .then(canvas => {
      img6 = canvas.toDataURL('image/png');

      doc.addImage(img1, 'PNG', 10, 10, 572, 770);
      doc.addPage();//aqui hago un salto de pagina, una imagen en cada pagina
      doc.addImage(img2, 'PNG', 10, 10, 572, 770);
      doc.addPage();//aqui hago un salto de pagina, una imagen en cada pagina
      doc.addImage(img3, 'PNG', 10, 10, 572, 770);
      doc.addPage();//aqui hago un salto de pagina, una imagen en cada pagina
      doc.addImage(img4, 'PNG', 10, 10, 572, 770);
      doc.addPage();//aqui hago un salto de pagina, una imagen en cada pagina
      doc.addImage(img5, 'PNG', 10, 10, 572, 770);
      doc.addPage();//aqui hago un salto de pagina, una imagen en cada pagina
      doc.addImage(img6, 'PNG', 10, 10, 572, 770);
      doc.save('contratoadhesion.pdf');
            });
          });
        });
      });
    });
  });
  }
/* 
    var doc = new jsPDF('p', 'pt','a4');

    html2canvas(document.querySelector(`#PDFcontratocredito1`)).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      html2canvas(document.querySelector(`#PDFcontratocredito2`)).then(canvas => {
        const imgData2 = canvas.toDataURL('image/png');
        console.log('div 1',imgData);
         doc.addImage(imgData, 'PNG', 10, 10, 572, 770);
         doc.addPage();//aqui hago un salto de pagina, una imagen en cada pagina
         console.log('div 2',imgData2);
         doc.addImage(imgData2, 'PNG', 10, 10, 572, 770);

         doc.save(`contratoadhesion.pdf`);
        });
     }); */

    

    /* html2canvas(document.querySelector(`#PDF${target}`), {
      scale: .75
    }).then(async (canvas) => {
      const imgData = await canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'pt','a4');
    
      doc.addImage(imgData, 'PNG', 10, 10, 572, 770);

      doc.addPage();
      doc.text(20, 30, 'This is some normal sized text underneath.');

    var base = doc.output('datauristring');  //Base 64 pdf
    // var base = imgData; 
    //console.log("base64 amort png",base);
    this.pagareB64 = base;
    doc.save(`${target}.pdf`);  //descarga Pdf
  }); */

  


}
