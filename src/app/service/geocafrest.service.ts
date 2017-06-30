import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Poi } from "../model/poi";

export interface PoiJSON {
  libelle: string;
  coord: CoordJSON;
}

export interface CoordJSON {
  lat: number;
  lng: number;
}

@Injectable()
export class GeocafrestService {

  constructor(private http: Http, @Inject("urlServiceRest") private url: string) { }

  getPois(): Observable<Array<PoiJSON>> {

    var allPois = this.url;

    //console.log("recuperation des pois");

    return this.http.request(allPois).map((response: Response) => {
      //console.log(response.json());
      let data = response.json();
      //console.log(data[0]['libelle'])
      let pois = [];
      for (var _i = 0; _i < data.length; _i++) {
        //console.log(data[_i]['coord']);
        let lat: number = data[_i]['coord']['lat'];
        let lng: number = data[_i]['coord']['lng'];
        pois.push(new Poi(lat, lng, data[_i]['libelle'], ''));
      }
      return pois;
    })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
