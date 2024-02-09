import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string,
  marker: Marker,
}

interface PlainMarker {
  color: string,
  lngLat: number[],
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[]=[];

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-76.90740474374206, -12.211427249429775);

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

    this.readFromLocalStorage();

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

  createMarker() {
    if ( !this.map )  return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();


    this.addMarker(lngLat, color)
  }

  addMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

      this.markers.push({ color, marker });
      this.saveToLocalStorage();

    marker.on('dragend', () => {
      console.log(marker.getLngLat());
      this.saveToLocalStorage();
    })

  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice( index , 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return { 
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    console.log(plainMarkers);
    
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plaiMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    console.log(plaiMarkers);
    plaiMarkers.forEach( ({ color, lngLat  }) => {
      const  [lng, lat] = lngLat;
      const coords = new LngLat( lng , lat )
      this.addMarker( coords, color);
    });
  }

}
