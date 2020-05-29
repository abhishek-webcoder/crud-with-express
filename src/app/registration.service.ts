import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private _http: HttpClient) {}

  register(userData) {
    return this._http.post<any>(environment.apiUrl + 'enroll', userData);
  }

  getData() {
    return this._http.get<any>(environment.apiUrl + 'getData');
  }

  getIndivData(id: number) {
    return this._http.post<any>(environment.apiUrl + 'getIndvData', id);
  }

  updateData(userData, id: number) {
    return this._http.post<any>(environment.apiUrl + 'update/' + id, userData);
  }

  deleteData(id: number) {
    return this._http.post<any>(environment.apiUrl + 'delete', id);
  }

  // For single file upload
  upload(data) {
    return this._http.post<any>(environment.apiUrl + 'upload', data);
  }

  // For multiple file upload
  uploads(data) {
    return this._http.post<any>(environment.apiUrl + 'uploads', data);
  }
}
