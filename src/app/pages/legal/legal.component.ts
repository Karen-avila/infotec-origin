import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {
popup;
  constructor() { }

  ngOnInit() {
    let elems = document.querySelectorAll('.modal');
    this.popup = M.Modal.init(elems);
  }

}
