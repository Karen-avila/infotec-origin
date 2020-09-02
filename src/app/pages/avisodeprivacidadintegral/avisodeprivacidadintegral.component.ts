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
      doc.save('avisodeprivacidad.pdf');
            });
          });
        });
      });
    });
  });
}

}
