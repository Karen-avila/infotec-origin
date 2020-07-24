import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pagare',
  templateUrl: './pagare.component.html',
  styleUrls: ['./pagare.component.css']
})
export class PagareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
