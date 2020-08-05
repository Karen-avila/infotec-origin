import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-avisodeprivacidadintegral',
  templateUrl: './avisodeprivacidadintegral.component.html',
  styleUrls: ['./avisodeprivacidadintegral.component.css']
})
export class AvisodeprivacidadintegralComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  downloadPDF($event, target) {
    html2canvas(document.querySelector(`#PDF${target}`), {
      scale: .65
    }).then(async (canvas) => {
      const imgData = await canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm');
      doc.addImage(imgData, 'PNG', -2, 0);
      doc.save(`${target}.pdf`);
    });
  }

}
