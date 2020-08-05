import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-avisodeprivacidad',
  templateUrl: './avisodeprivacidad.component.html',
  styleUrls: ['./avisodeprivacidad.component.css']
})
export class AvisodeprivacidadComponent implements OnInit {
popup;
  constructor() { }

  ngOnInit() {
    let elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);
  }

}
