import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { LoanDataService } from '../../services/service.index';

import * as moment from 'moment';

@Component({
  selector: 'app-pagare',
  templateUrl: './pagare.component.html',
  styleUrls: ['./pagare.component.css']
})

export class PagareComponent implements OnInit {
  loanData;
  date;
  expiredDate;

  pagareB64: string = "hi5";

  @Output()
  prpPagare = new EventEmitter<string>();

  constructor(public loanService: LoanDataService) { }

  ngOnInit() {
    this.date = moment().locale('es').format('Do MMMM YYYY');
        
        this.loanService.getLoanData().subscribe(
          data => {
            this.loanData = data;
            this.expiredDate = moment(data.timeline.expectedMaturityDate[0] + "/" + data.timeline.expectedMaturityDate[1] + "/" + data.timeline.expectedMaturityDate[2]).locale('es').format('Do MMMM YYYY');
            this.date = moment().locale('es').format('Do MMMM YYYY');
          },
          error => console.error('error en data loan ')
        )
        
  }

  sendPagare() {
    this.prpPagare.emit(this.pagareB64);
  }

  downloadPDF($event, target) {
    html2canvas(document.querySelector(`#PDF${target}`), {
      scale: .75
    }).then(async (canvas) => {
      const imgData = await canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm');
      
      doc.addImage(imgData, 'PNG', 10, 10);
      /* var base = doc.output('datauristring'); */  //Base 64 pdf
      var base = imgData;
      ////console.log("base64 png",base);
      this.pagareB64 = base;
      this.sendPagare();
      /* doc.save(`${target}.pdf`); */  //descarga Pdf
    });
  }

}


