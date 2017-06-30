import { Injectable } from '@angular/core';

import { AppSettings } from "../appSettings"

@Injectable()
export class LocationService {

  xhr = new XMLHttpRequest();

  constructor() { }

  findLocation(location: string, async: boolean, callback: (pos) => void) {

    var urlgeocode = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + AppSettings.GOOGLE_MAP_KEY;

    this.xhr.open('GET', urlgeocode, async); // true = async, false = sync
    if (async) {
      this.xhr.addEventListener("readystatechange", function (e) {
        // alert("process reponse" + xhr.readyState + " / " + xhr.status);
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
          // alert("got full anwser");
          //console.log(this.xhr.responseText);
          var newposition = this.extractLocationGmaps(this.xhr.responseText);
          console.log(newposition);
          callback(newposition);
        }
      }.bind(this), false);
    }

    this.xhr.send();

    if (!async) {
      // alert("expecting immediate anwser");
      var newposition = this.extractLocationGmaps(this.xhr.responseText);
      return newposition;
    }
  }
  
  extractLocationGmaps(jsonText) {
    //	alert(jsonText);
    var response = JSON.parse(jsonText);
    //	alert(response);
    // alert("response" + response);
    var newposition = response.results[0].geometry.location;
    return newposition;
  }
}
