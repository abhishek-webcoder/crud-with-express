import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidtrackService {

  constructor(private http: HttpClient) { }

  worldData(country) {
    return this.http.get<any>('https://api.covid19api.com/country/' + country);
  }

  worldCountries() {
    return this.http.get<any>('https://api.covid19api.com/countries');
  }
}
