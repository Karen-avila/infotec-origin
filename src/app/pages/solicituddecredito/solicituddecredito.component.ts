import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/service.index';
import { LoanDataService } from '../../services/service.index';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as moment from 'moment';

@Component({
  selector: 'app-solicituddecredito',
  templateUrl: './solicituddecredito.component.html',
  styleUrls: ['./solicituddecredito.component.css']
})
export class SolicituddecreditoComponent implements OnInit {
  loanData;
  personalData;
  addressData;
  date;
  pagareB64;
  email;
  

  constructor(public loanService: LoanDataService, public userService : UserService ) { }

  ngOnInit() {
  this.email = localStorage.getItem('email')

    this.loanService.nombre.subscribe((value) => {
      this.loanData = value; 
  });
    this.loanService.personalData.subscribe((value) => {
      this.personalData = value; 
  });
    this.loanService.addressData.subscribe((value) => {
      this.addressData = value[0]; 
  });


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
