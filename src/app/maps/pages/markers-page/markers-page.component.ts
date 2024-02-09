import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-76.90740055499282, -12.211394854265166);

  ngAfterViewInit(): void {
    console.log(this.divMap);

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      //container: 'map', // container ID
      container: this.divMap.nativeElement, // referencia del elemento
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    // CREATE CUSTOMS MARKERS
    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Yefferson Barrial';

    // const marker = new Marker({ 
    //                             //color: 'purple'
    //                             element: markerHTML
    //                           })
    //                           .setLngLat( this.currentLngLat )
    //                           .addTo(this.map);

  }

}
