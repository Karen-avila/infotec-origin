import { Component, OnInit } from '@angular/core';

import { LoanDataService } from '../../services/service.index';

import * as moment from 'moment';

@Component({
  selector: 'app-solicituddecredito',
  templateUrl: './solicituddecredito.component.html',
  styleUrls: ['./solicituddecredito.component.css']
})
export class SolicituddecreditoComponent implements OnInit {
  loanData;
  personalData
  date;

  constructor(public loanService: LoanDataService) { }

  ngOnInit() {
    this.loanService.nombre.subscribe((value) => {
      this.loanData = value; 
  });
  this.loanService.personalData.subscribe((value) => {
    this.personalData = value; 
});

  }

}
