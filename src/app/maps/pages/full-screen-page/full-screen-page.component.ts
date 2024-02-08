import * as mapboxgl from 'mapbox-gl';

import { AfterViewInit, Component } from '@angular/core';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoieWJhcnJpYWxhIiwiYSI6ImNsc2Nkd2NibjBtemkybHJrZjJhZ2czc2EifQ.76Aa5iuvgAs7FseLM4Lw_A';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
