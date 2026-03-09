import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpAuth } from './http-auth';

@Injectable({
  providedIn: 'root',
})
export class HttpUser {
  private apiUrl: string = environment.apiUrl;
  private slug: string = 'users';

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth,
  ) {}

  createUser(formData: {
    username: string;
    email: string;
    password: string;
    role: string;
    name: string;
  }) {
    return this.http.post(`${this.apiUrl}/${this.slug}`, formData, {
      headers: this.httpAuth.getHeader(),
    });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.slug}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  deleteUser(userDelete: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.slug}/${userDelete}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  updateUser(id: String | null, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${this.slug}/${id}`, data, {
      headers: this.httpAuth.getHeader(),
    });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.slug}/${id}`, {
      headers: this.httpAuth.getHeader(),
    });
  }
}
