import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAuth } from './http-auth';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpFavorites {
  private apiUrl: string = environment.apiUrl;
  private slug: string = 'favorites';

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth,
  ) {}

  getFavorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.slug}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  addItem(productId: string, quantity: number, price: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${this.slug}`,
      { productId, quantity, price },
      { headers: this.httpAuth.getHeader() },
    );
  }

  removeItem(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.slug}/${productId}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  clearFavorites(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.slug}/clear`, {
      headers: this.httpAuth.getHeader(),
    });
  }
}
