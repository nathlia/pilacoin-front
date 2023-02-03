import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAccount } from '../models/user-account.model';

const baseUrl = "http://localhost:8080/users"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(baseUrl);
  }

  get(id: any): Observable<UserAccount> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

}
