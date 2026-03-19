import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAuth } from './http-auth';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpCart {
  private apiUrl: string = environment.apiUrl;
  private slug: string = 'cart';

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth,
  ) {}

  getCart(): Observable<any> {
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

  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${this.slug}`,
      { productId, quantity },
      { headers: this.httpAuth.getHeader() },
    );
  }

  removeItem(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.slug}/${productId}`, {
      headers: this.httpAuth.getHeader(),
    });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.slug}/clear`, {
      headers: this.httpAuth.getHeader(),
    });
  }
}
