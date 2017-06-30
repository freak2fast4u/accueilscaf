import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response } from "@angular/http";

import { AgmCoreModule } from '@agm/core';

import { Poi } from "../model/poi";

import { LocationService } from '../service/location.service';

import { GeocafrestService } from '../service/geocafrest.service';

@Component({
  selector: 'app-search-caf',
  templateUrl: './search-caf.component.html',
  styleUrls: ['./search-caf.component.css']
})
export class SearchCafComponent implements OnInit {

  constructor(private locationService: LocationService,
    private geocafservice: GeocafrestService)  { }

  pois = [];
  codePostal: string;
  // lyon servient (Cnaf site de Lyon)
  lat: number = 45.760917; 
  lng: number =  4.853871;
  zoom: number = 12;

  ngOnInit() {
    /*this.getPoi()
      .subscribe(r => this.pois = r);*/
    this.geocafservice.getPois()
      .subscribe(r => this.pois = r); 
  }

  getPoi(): Observable<Array<Poi>> {
    return Observable.of([
      new Poi(45.7675824, 4.8326981, 'Permanence CAF Caluire', '<div>Ma super info Window</div>'),
      new Poi(45.7620738, 4.8513233, 'CAF Lyon Vivier Merle', '<div>On peut meme <span style="color: blue;">mettre</span> des couleurs</div>'),
      new Poi(45.730456, 4.8633293, 'CAF Rhône Lyon 8', '<strong>En Gras</strong> aussi'),
      new Poi(45.732543, 4.9093643, 'CAF Bron', '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLmyOPL-YNI7AfG8CSrSu1xc56CYton6oI6fYdJpYnMsAuZFW7" />')
    ]);
  }

  initMap(codePostal) {
    console.log("ici");
    this.codePostal = codePostal;
    if (this.codePostal != null && this.codePostal !== "") {
      console.log(this.codePostal);
      this.locationService.findLocation(this.codePostal, true, function (pos) {
        this.lat = pos.lat;
        this.lng = pos.lng;

        this.geocafservice.getPois()
          .subscribe(r => {
            this.pois = r;
            this.pois.push(new Poi(this.lat, this.lng, 'Position recherchée', 'Location found.'));
          });

      }.bind(this));
    } 
  }

  meLocaliser() {

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat + " - " + this.lng);

        this.geocafservice.getPois()
          .subscribe(r => {
            this.pois = r;
            this.pois.push(new Poi(this.lat, this.lng, 'Ma position', 'Location found.'));
          }); 

      }.bind(this), function () {
        console.log("Erreur lors de la recuperation de la geolocalisation");
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Le navigateur ne supporte pas la geolocalisation");
    }
  }

  onSubmit() {
    /*let defaultHeaders: Headers = new Headers();
    

    let requestOptions: RequestOptionsArgs = {
      method: 'POST',
      headers: defaultHeaders
    };
    console.log(requestOptions);*/
    console.log(this.codePostal);
  }
}
