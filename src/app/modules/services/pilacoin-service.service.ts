import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/pilacoins';

@Injectable({
  providedIn: 'root'
})
export class PilacoinService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  getAllColega(): Observable<any> {
    return this.http.get(`${baseUrl}/pila-do-colega`);
  }


  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  minerar(minerar: boolean): Observable<any> {
    return this.http.get(`${baseUrl}/minerar/${minerar}`);
  }

  validarCoin(): Observable<any> {
    return this.http.get(`${baseUrl}/pilacoin/validaPilaOutroUsuario`);
  }
}