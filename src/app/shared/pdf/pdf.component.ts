import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  src = "../../../assets/Caratula.pdf";

  constructor() { }

  ngOnInit() {
  }

}
