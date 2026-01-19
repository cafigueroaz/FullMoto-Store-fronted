import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUser {
  constructor(private http: HttpClient) {}

  createUser(userData: any) {
    return this.http.post('http://localhost:3000/api/v1/users', userData);
  }
}
