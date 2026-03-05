import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpUser {
  private apiUrl: string = environment.apiUrl;
  private slug: string = 'auth';

  constructor(private http: HttpClient) {}

  createUser(formData: {
    username: string;
    email: string;
    password: string;
    role: string;
    name: string;
  }) {
    return this.http.post(`${this.apiUrl}/${this.slug}/register`, formData);
  }
}
