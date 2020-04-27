import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  public markers: {lat: number, long: number}[];   // Map markers (relevance depends on map center)

  constructor() { 
    // some map markers
    this.markers = [
      { lat: 19.4032, long: -99.1698   }
    ];
  }

  ngOnInit() {
  }

}
