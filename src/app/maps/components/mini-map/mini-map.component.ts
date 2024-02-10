import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  public map?: Map;

  public zoom: number = 15;

  @Input() lngLat?: [number, number];

  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement) throw "Map Div not found";
    if( !this.lngLat ) throw "LngLat can't be null";


    this.map = new Map({
      //container: 'map', // container ID
      container: this.divMap.nativeElement, // referencia del elemento
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive: false, // no move no nothing.
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo( this.map )

  }  

}
