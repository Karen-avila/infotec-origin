import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.component.html',
  styleUrls: ['./pick-address.component.css']
})
export class PickAddressComponent implements OnInit {

  // google maps zoom level
  zoom = 8;
  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;
  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  constructor() {}
  ngOnInit() {}

  clickedMarker(label: string, index: number) {
    // //console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    // //console.log('dragEnd', m, $event);
  }

}
