import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) { }

  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  login(data) {
    this.loggedIn = true;
    return this._http.post<any>(environment.apiUrl + 'login', data);
  }

  logout() {
    this.loggedIn = false;
  }

  // To pass JWT tocken in header
  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
