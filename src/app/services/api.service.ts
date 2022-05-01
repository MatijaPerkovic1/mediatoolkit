import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  headers: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`http://localhost:3000/${path}`, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`http://localhost:3000/${path}`, JSON.stringify(body), { headers: this.headers });
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`http://localhost:3000/${path}`, JSON.stringify(body), { headers: this.headers });
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/${path}`);
  }
}