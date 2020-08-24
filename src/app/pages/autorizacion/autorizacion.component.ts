import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css']
})
export class AutorizacionComponent implements OnInit {
date;
  constructor() { }

  ngOnInit() {

    this.date = moment().locale('es').format('Do MMMM YYYY');
  
  }

  
}
