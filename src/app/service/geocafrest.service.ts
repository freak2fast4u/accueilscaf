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

  servicesPOI:Map<string, Object>;

  getPois(): Observable<Array<PoiJSON>> {



  this.servicesPOI = new Map<string,Object>();
  
    this.servicesPOI.set('H_AUD', {
      url: 'assets/Deficients-auditifs-RVB_medium.jpg',
      libelle: 'Déficients auditifs'
    });
    this.servicesPOI.set('H_AUD_BM', {
      url: 'assets/Deficients-auditifs-boucle-magnetique-RVB_medium.jpg',
      libelle: 'Déficients auditifs, boucle magnétique'
    });
    this.servicesPOI.set('H_MOT', {
      url: 'assets/Deficients-moteur-RVB_medium.jpg',
      libelle: 'Déficients moteur'
    });
    this.servicesPOI.set('H_VIS', {
      url: 'assets/Deficients-visuels-RVB_medium.jpg',
      libelle: 'Déficients visuels'
    });
    this.servicesPOI.set('H_MEN', {
      url: 'assets/Deficients-mentaux-RVB_medium.jpg',
      libelle: 'Déficients mentaux'
    });
    this.servicesPOI.set('DEMRSA', {
      libelle: 'Accueil nouveaux bénéficiaires RSA'
    });
    this.servicesPOI.set('MEDADM', {
      libelle: 'Médiation administrative'
    });
    this.servicesPOI.set('PERJUR', {
      libelle: 'Permanence juridique'
    });
    this.servicesPOI.set('ATT', {
      libelle: 'Délivrance d\'attestations'
    });

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
        pois.push(new Poi(lat, lng, data[_i]['libelle'], this.generatePOIInfoWindowContent(data[_i])));
      }
      return pois;
    })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


 generatePOIInfoWindowContent(poi:Object): string {
      console.log(poi);
      var content = '<div id="infoWindowLabel"><b>' + poi['libelle'] + '</b></div>';
      content += '<div id="infoWindowAdresse"><b>Adresse :</b> ' + poi['adresse'] + '</div>';
      content += '<div id="infoWindowHoraires"><b>Horaires : </b>' + poi['horaires'] + '</div>';
      if (poi['services'] && poi['services'].length > 0) {
        content += '<div id="infoWindowServices"><b>Services : </b>';
        console.log(poi['services']);
        for (var i = 0; i < poi['services'].length; i++) {
          var unService = poi['services'][i];
          console.log(unService);
          if (this.servicesPOI.get(unService)) {
            console.log(this.servicesPOI.get(unService));

            if (this.servicesPOI.get(unService)['url']) {
              content += '<img src="' + this.servicesPOI.get(unService)['url'] + '" alt="' + this.servicesPOI.get(unService)['libelle'] +
                '" title="' + this.servicesPOI.get(unService)['libelle'] +
                '" width="48" height="48" />&nbsp;';
            } else {
              content += '<li>' + this.servicesPOI.get(unService)['libelle'] + '</li>'
            }
          }

        }
        content += '</div>';
      }

      return content;
    }

}
