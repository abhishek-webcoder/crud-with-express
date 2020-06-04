import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  custom_url: any;
  constructor(private _http: HttpClient) { }

  getData() {
    return this._http.get<any>('http://newsapi.org/v2/top-headlines?country=in&apiKey=d7d62eb1e2a043d996fc0478292adf3b');
  }

  getCustomData(type: string) {
    this.custom_url = 'http://newsapi.org/v2/top-headlines?country=in&category=' + type + '&apiKey=d7d62eb1e2a043d996fc0478292adf3b';

    return this._http.get<any>(this.custom_url);
  }
}
