import { Component, OnInit } from '@angular/core';
import { LoanDataService } from '../../services/service.index';

import * as moment from 'moment';

@Component({
  selector: 'app-contratodecredito',
  templateUrl: './contratodecredito.component.html',
  styleUrls: ['./contratodecredito.component.css']
})
export class ContratodecreditoComponent implements OnInit {
loanData;
date;
  constructor(public loanService: LoanDataService) { }

  ngOnInit() {
    this.loanService.nombre.subscribe((value) => {
      this.loanData = value; 
  });

    this.date = moment().locale('es').format('Do MMMM YYYY');
  }
  

}
