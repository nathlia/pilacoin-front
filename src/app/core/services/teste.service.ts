import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TesteService {
  private readonly baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) {}

  teste(): Observable<string> {
    return this.http.get(this.baseUrl+'teste', {responseType:'text'});
  }
}
