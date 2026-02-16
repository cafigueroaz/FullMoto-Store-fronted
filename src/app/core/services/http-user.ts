import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUser {
  constructor(private http: HttpClient) {}

  createUser
  (formData: {username: string; email: string; password: string; role: string; name: string}) {
    return this.http.post('http://localhost:3000/api/v1/auth/register', formData);
  }

 

}
