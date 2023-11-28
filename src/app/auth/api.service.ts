import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { link } from './enlace';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAcceso(endpoint: string) {
    return this.http.get( link + endpoint);
  }

  public postAcceso(endpoint: string, body: Object) {
    return this.http.post(link + endpoint, body);
  }
}
